
import React from "react";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { getCookie } from "@utils/fetch";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearCart } from "@redux/slices/cart";
import { ExProduct } from "@types";
export default function StripeForm() {
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
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

  const [message, setMessage] = React.useState('');
const csrfToken = getCookie('csrftoken');
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
 const products = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];
 
  const totalMoney = products?.reduce(
    (pre, curr) => pre + curr.quantity * Number.parseFloat(curr.price || "0"),
    0
  );
 
 
  const dispath=useDispatch()
  const router=useRouter()
  const handleSubmit2 = async (e:any) => {

    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const {error: backendError, clientSecret} = await fetch(
      '/api/payment/stripe/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken':`${csrfToken}`
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency: 'usd',
          amount:totalMoney
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
    //   addMessage(backendError.message);
      return;
    }

    // addMessage('Client secret returned');

    const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement) as any,
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      }
    );

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
    //   addMessage(stripeError.message);
      return;
    }
if(paymentIntent){
  dispath(clearCart())
  router.push('/stripe_success')
}

  };
  return (
    <form id="payment-form" onSubmit={handleSubmit2}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <button type="submit">Paynow</button>
    </form>
  );
}