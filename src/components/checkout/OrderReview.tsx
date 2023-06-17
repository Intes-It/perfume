import { ExProduct } from "@types";
import { formatCurrency } from "@utils/formatNumber";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { clearCart } from "@redux/slices/cart";
import { api } from "@utils/apiRoute";
import { instance } from "@utils/_axios";
import { Badge, Button } from "flowbite-react";
import { POST } from "@utils/fetch";
import { getCookie } from "cookies-next";
import useUser from "@hooks/useUser";

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
  email,
}) => {
  const [state, setState] = useState({
    carte: false,
    paypal: true,
    clientSecret: "",

    voucherChoose: [] as voucherCost[],
    loading: false,
  });
  const user = useUser();

  const { carte, paypal, voucherChoose, loading } = state;
  const [message, setMessage] = React.useState("");
  const [voucher, setVoucher] = useState<voucherCost[]>([]);
  const [weight, setWeight] = useState<weightCost[]>([]);
  const products = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];

  const totalMoney = products?.reduce(
    (pre, curr) => pre + curr.quantity * Number.parseFloat(curr.price || "0"),
    0
  );
  const totalWeight = products?.reduce(
    (pre, curr) =>
      pre +
      curr.quantity * Number.parseFloat(curr.product.weight?.toString() || "0"),
    0
  );
  const totalDiscount = voucherChoose.reduce((p, c) => p + c.discount, 0);

  const shippingCost = weight.reduce((pre, curr) => pre + curr.cost, 0);

  const extraTotalMoney =
    totalMoney - totalMoney * (totalDiscount / 100) + shippingCost;

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
            amount: extraTotalMoney ? +extraTotalMoney : +totalMoney,
            fee_ship: shippingCost,
            order_id: orderID,
          }),
        }
      ).then((r) => r.json());

      if (backendError) {
        return;
      }
      setState(p=>({...p,loading:true}))
      const res = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as any,
          billing_details: {
            email: user.user.email,
          },
        },
      });
     
      if (res.error) {
        await POST("/api/payment/email-payment-fail", { order_id: orderID });
        alert(res.error.message)
      }
      if(res.paymentIntent){
       await POST(api.send_mail, {
          order_id: orderID,
        });
        dispatch(clearCart());
        router.push("/stripe_success");
      }
      setState(p=>({...p,loading:false}))
      /* if (stripeError) {
        return;
      }
      if (paymentIntent) {
        POST(api.send_mail, {
          order_id: orderID,
        });
        dispatch(clearCart());
        router.push("/stripe_success");
      } */
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
        <div className={"flex mb-2 align-middle"}>
          <p>Choose voucher</p>{" "}
          {voucher.map((item: any) => (
            <Button
              className="ml-1"
              key={item.id}
              onClick={() => {
                setState((p) => ({
                  ...p,
                  voucherChoose: [...voucherChoose, item],
                }));
                setVoucher(voucher.filter((itemv: any) => itemv !== item));
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className="border border-black">Order Review</div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Produit</div>
          <div className="border border-black">Sous-total</div>
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
          <div className="border border-black">Sous-total</div>
          <div className="border border-black">
            {formatCurrency(String(totalMoney))} €
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Expédition</div>
          <div className="border border-black">
            <p>contenance:{totalWeight}g</p>
            <p>frais de port:{shippingCost}€</p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Voucher</div>
          {/* <input className='focus:border-none border border-black'/> */}
          <div className="focus:border-none border border-black flex py-2">
            {voucherChoose.map((item: any, index: number) => (
              <Badge
                key={index}
                className={"ml-1 cursor-pointer"}
                onClick={() => {
                  setState((p) => ({
                    ...p,
                    voucherChoose: voucherChoose.filter(
                      (itemc: any) => itemc !== item
                    ),
                  }));
                  setVoucher([...voucher, item]);
                }}
              >
                {item.name} discount {item.discount}%
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Total</div>
          <div className="border border-black">
            {extraTotalMoney
              ? extraTotalMoney.toFixed(2)
              : totalMoney?.toFixed(2)}
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
            Carte Bancaire
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
              Je voudrais recevoir des e-mails exclusifs avec des réductions et
              des informations sur le produit (facultatif)
            </span>
          </div>
          <div className="mt-6 flex items-center">
            <span className="text-black  font-semibold">
              Vos données personnelles seront utilisées pour le traitement de
              votre commande, vous accompagner au cours de votre visite du site
              web, et pour d’autres raisons décrites dans notre politique de
              confidentialité.
            </span>
          </div>
          <div className=" grid mt-2 items-center">
            {carte ? (
              <button
                type={"submit"}
                className="h-[50px] rounded-md p-3 text-white hover:bg-black bg-[#603813] "
                disabled={loading}
              >
                {loading?'En Cours':'Comander'}
              </button>
            ) : (
              <button
                type={"button"}
                onClick={onOderClicked}
                className="h-[50px] rounded-md p-3 text-white hover:bg-black bg-[#603813] "
              >
                Commander
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderReview;
