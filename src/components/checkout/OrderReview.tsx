import { ExProduct } from "@types";
import { formatCurrency } from "@utils/formatNumber";
import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { clearCart } from "@redux/slices/cart";
import { api } from "@utils/apiRoute";
import { instance } from "@utils/_axios";
import { GET, POST } from "@utils/fetch";
import { getCookie } from "cookies-next";
import useUser from "@hooks/useUser";
import useSWR from "swr";

type OrderReviewProps = {
  onOderClicked?: () => void;
  orderID: number;
  email?: string;
};
type weightCost = {
  cost: number;
};
type voucherCost = {
  id: number;
  discount: number;
};
const OrderReview: React.FC<OrderReviewProps> = ({
  onOderClicked,
  orderID,
  // email,
}) => {
  const [state, setState] = useState({
    carte: false,
    paypal: true,
    clientSecret: "",
    voucherDiscount: 0,
    voucherChoose: [] as voucherCost[],
    loading: false,
    discountType: "",
    totalPayment: 0,
    fee_ship: 0,
  });
  const user = useUser();

  const {
    carte,
    paypal,
    loading,
    voucherDiscount,
    discountType,
    totalPayment,
    fee_ship,
  } = state;
  const [message, setMessage] = React.useState("");
  const [voucher, setVoucher] = useState<voucherCost[]>([]);
  const [weight, setWeight] = useState<weightCost[]>([]);
  const products = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];
  const voucherRef = useRef<HTMLInputElement | null>(null);
  const totalMoney = useMemo(()=>{products?.reduce(
    (pre, curr) => pre + curr.quantity * Number.parseFloat(curr.price || "0"),
    0
  )},[products]);
  async function getCart() {
    const res = await GET(api.getCart);
    return res.data;
  }
  const { data, mutate } = useSWR("get-server-cart", getCart);
  const cart = data?.cart;

  const totalWeight =useMemo(()=>{ products?.reduce(
    (pre, curr) =>
      pre +
      curr.quantity * Number.parseFloat(curr.product.weight?.toString() || "0"),
    0
  )},[products]);
  // const totalDiscount = voucherChoose.reduce((p, c) => p + c.discount, 0);

  // const shippingCost = weight.reduce((pre, curr) => pre + curr.cost, 0);

  const stripe = useStripe();
  const elements = useElements();
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#ed2024",
        iconColor: "#ed2024",
      },
    },
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const csrfToken = getCookie("csrftoken");

  async function handleStripePayment(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      const { error: backendError, clientSecret } = await fetch(
        "/api/payment/stripe/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": `${csrfToken}`,
          },
          body: JSON.stringify({
            paymentMethodType: "card",
            currency: "eur",
            amount: totalPayment ? totalPayment : cart.total_price_payment,
            fee_ship: fee_ship ? fee_ship : cart.fee_ship,
            order_id: orderID,
          }),
        }
      ).then((r) => r.json());

      if (backendError) {
        return;
      }
      setState((p) => ({ ...p, loading: true }));
      const res = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as any,
          billing_details: {
            email: user.user.email,
          },
        },
      });
 console.log(res);

      // if (res.error) {
      //   await POST("/api/payment/email-payment-fail", { order_id: orderID });
      //   alert(res.error.message);
      // }
      if (res.paymentIntent?.status === "succeeded") {
        await POST(api.send_mail, {
          order_id: orderID,
        });
        dispatch(clearCart());
        router.push("/stripe_success");
      }
      setState((p) => ({ ...p, loading: false }));
    } catch (e) {
      alert(e);
    }
  }
  async function applyVoucher() {
    try {
      const res = await POST("/api/orders/apply_voucher", {
        order_id: orderID,
        voucher_code: voucherRef.current?.value,
      });
      console.log(res);
      if (res.status === 200) {
        await mutate("get-cart-server");
        setState((p) => ({
          ...p,
          voucherDiscount: res.data?.voucher?.discount,
          discountType: res.data?.voucher?.discount_type,
          totalPayment: res.data?.cart?.total_price_payment,
          fee_ship: res.data?.cart?.fee_ship,
        }));
      }
      if (res.data.message) {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  }
  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  React.useEffect(() => {
    instance
      .get(`${api.shipping_weight}?weight=${totalWeight}`)
      .then((data) => setWeight(data.data));
  }, []);
  React.useEffect(() => {
    instance(api.product_voucher).then((data) => setVoucher(data.data));
  }, []);
  return (
    <div className="bg-[#FBFBFB]">
      <div className="grid">
        <div className="border border-black">Order Review</div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Product</div>
          <div className="border border-black">Sub-total</div>
        </div>
        {products?.map((item: ExProduct, index: number) => (
          <div key={index} className="grid grid-cols-2">
            <div className="border border-black">
              {item.product.name} x {item.quantity}
            </div>
            <div className="border border-black">
              {formatCurrency(String(item.price))} €
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2">
          <div className="border border-black">Sub-total</div>
          <div className="border border-black">
            {formatCurrency(String(cart?.total_price_cart))} €
          </div>
        </div>
        {/* <div className="grid grid-cols-2">
          <div className="border border-black">Bon</div>
          <div className="focus:border-none border border-black flex py-2 pl-1">
            <input
              className="border-none  pl-2 focus:outline-none uppercase"
              ref={voucherRef}
            />
            <button className={"border-0"} onClick={applyVoucher}>
              <span className={"text-blue-500"}>Appliquer le Bon</span>
            </button>
          </div>
        </div> */}
        {/* <div className="grid grid-cols-2">
          <div className="border border-black">Expédition</div>
          <div className="border border-black flex">
            <p>
              Contenance:<strong>{cart?.total_weight}g</strong>
            </p>
            /
            <p>
              Frais de port:
              <strong>{fee_ship ? fee_ship : cart?.fee_ship}€</strong>
            </p>
            /
            <p>
              bon de réduction:
              <strong>
                {voucherDiscount}
                {discountType === ""
                  ? ""
                  : discountType === "percentage"
                  ? "%"
                  : "€"}
              </strong>
            </p>
          </div>
        </div> */}

        <div className="grid grid-cols-2">
          <div className="border border-black">Total</div>
          <div className="border border-black">
            {formatCurrency(
              String(totalPayment ? totalPayment : cart?.total_price_payment)
            )}
            €
          </div>
        </div>
        <div className="flex mt-5 items-center">
          <input
            onChange={() =>
              setState((o) => ({ ...o, carte: true, paypal: false }))
            }
            type="radio"
            checked={carte}
            id="remember"
            className="w-4 h-4 mr-2 "
          />
          <span className="text-black text-[22px] font-semibold">
            Card 
          </span>
        </div>
        <form
          className="mt-5"
          onSubmit={carte ? handleStripePayment : () => console.log(stripe)}
        >
          {/* first form */}
          {carte && (
            <>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </>
          )}
          {/* PayPal */}
          <div className="flex mt-5 items-center">
            <input
              checked={paypal}
              onChange={() =>
                setState((o) => ({ ...o, carte: false, paypal: true }))
              }
              type="radio"
              id="remember"
              className="w-4 h-4 mr-2 "
            />
            <span className="text-black text-[22px] font-semibold">PayPal</span>
          </div>
          <div className="mt-7">
            {paypal ? (
              <div className="grid bg-[#efefef]">Pay via PayPal.</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="mt-6 flex items-center">
            <input type="checkbox" id="remember" className="w-4 h-4  mr-2 " />
            <span className="text-black  font-semibold">
             I would like to receive exclusive emails with discounts and product information (optional)
            </span>
          </div>
          <div className="mt-6 flex items-center">
            <span className="text-black  font-semibold">
            Your personal data will be used to process your order, accompany you during your visit to the website, and for other reasons described in our privacy policy.
            </span>
          </div>
          <div className=" grid mt-2 items-center">
            {carte ? (
              <button
                type={"submit"}
                className="h-[50px] rounded-md p-3 text-white hover:bg-black bg-[#603813] "
                disabled={loading}
              >
                {loading ? "Loading" : "Check out"}
              </button>
            ) : (
              <button
                type={"button"}
                onClick={onOderClicked}
                className="h-[50px] rounded-md p-3 text-white hover:bg-black bg-[#603813] "
              >
                CheckOut
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderReview;
