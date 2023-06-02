import useCheckout from "@hooks/useCheckout";
import { ExProduct } from "@types";
import { formatCurrency } from "@utils/formatNumber";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "@components/checkout/stripe_form";
import { POST } from "@utils/fetch";
import useCart from "@hooks/useCart";

type OrderReviewProps = {
  onOderClicked?: () => void;
  orderID: number;
};

const OrderReview: React.FC<OrderReviewProps> = ({
  onOderClicked,
  orderID,
}) => {
  const [state, setState] = useState({
    carte: false,
    paypal: true,
    clientSecret: "",
  });
  // const stripe=useStripe()
  // const elements=useElements()
  const { carte, paypal, clientSecret } = state;
  const stripePromise = loadStripe(
    "pk_test_51Mc4mkLl7R805p8J3t7dqoeBEGqXglTC8FiqLPmhobzxo9RDD9THPh2kMhECSAwFBlWhBqnY11HKHj8t2ZTEjoqP00Zm5l2381"
  );
  const products = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];
 
  const totalMoney = products?.reduce(
    (pre, curr) => pre + curr.quantity * Number.parseFloat(curr.price || "0"),
    0
  );

  async function handleStripePayment(e: React.FormEvent) {
   console.log(e);
  }
  const {cart}=useCart()
  console.log(cart);
  
  // useEffect(() => {
  //   fetch("/api/payment/stripe/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({products}),
  //   })
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setState((p) => ({ ...p, stripeSecret: data.clientSecret }))
  //     );
  // }, []);
  return (
    <div className="bg-[#FBFBFB]">
      <div className="grid">
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
          <div className="border border-black"></div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Total</div>
          <div className="border border-black">
            {formatCurrency(String(totalMoney))} €
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
        <div className="mt-5">
          {/* first form */}
          {carte ? (
            <div>
              {stripePromise && (
                <Elements
                  stripe={stripePromise}
                  // options={{ clientSecret}}
                >
                  <StripeForm />

                  {/*<form>
                <div className="grid gap-3 bg-[#efefef] ">
                  <div className="flex flex-col mt-6 mr-6 ml-6">
                    <label className="font-semibold">
                      Numéro de carte{" "}
                      <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <input
                      placeholder="4242 4242 4242 4242"
                      required
                      type="tel"
                      inputMode={"numeric"}
                      pattern={"[0-9s]{13,19}"}
                      maxLength={19}
                      id="id"
                      ref={cardRef}
                      className="h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 mt-10 mb-10">
                    <div className="flex flex-col mr-6 ml-6">
                      <label className="font-semibold">
                        Date d’expiration{" "}
                        <span className="text-red-500 text-[20px] ">*</span>
                      </label>

                      <input
                        ref={expiredRef}
                        required
                        type="month"
                        id="id"
                        className="h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                      />
                    </div>
                    <div className="flex flex-col ml-6 mr-6">
                      <label className="font-semibold">
                        Cryptogramme visuel{" "}
                        <span className="text-red-500 text-[20px] ">*</span>
                      </label>
                      <input
                        placeholder="entrez le numéro de cvv."
                        required
                        type="tel"
                        id="id"
                        inputMode={"numeric"}
                        pattern={"[0-9s]{13,19}"}
                        maxLength={3}
                        ref={cvvRef}
                        className=" h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                      />
                    </div>
                  </div>
                </div>
              </form>*/}
                </Elements>
              )}
            </div>
          ) : (
            <div></div>
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
            <button
              onClick={carte ? handleStripePayment : onOderClicked}
              className="h-[50px] rounded-md p-3 text-white hover:bg-black bg-[#603813] "
            >
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
