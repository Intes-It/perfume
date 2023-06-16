import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
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
const StripeForm = () => {
    const stripe=useStripe()
    const elements=useElements()

    const handleSubmit = async (event:React.FormEvent) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // const result = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardElement),
        //     billing_details: {
        //         // Include any additional collected billing details.
        //         name: 'Jenny Rosen',
        //     },
        // });
        //
        // stripePaymentMethodHandler(result);
    };
/*    const stripePaymentMethodHandler = async (result:any) => {
        if (result.error) {
            // Show error in payment form
        } else {
            // Otherwise send paymentMethod.id to your server (see Step 4)
            const res = await fetch('/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    payment_method_id: result.paymentMethod.id,
                }),
            })
            const paymentResponse = await res.json();

            // Handle server response (see Step 4)
            handleServerResponse(paymentResponse);
        }
    }
    const handleServerResponse = async (response:any) => {
        if (response.error) {
            // Show error from server on payment form
        } else if (response.requires_action) {
            // Use Stripe.js to handle the required card action

            const { error: errorAction, paymentIntent } =
                await stripe?.handleCardAction(response.payment_intent_client_secret);

            if (errorAction) {
                // Show error from Stripe.js in payment form
            } else {
                // The card action has been handled
                // The PaymentIntent can be confirmed again on the server
                const serverResponse = await fetch('/pay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ payment_intent_id: paymentIntent.id })
                });
                handleServerResponse(await serverResponse.json());
            }
        } else {
            // Show success message
        }
    }*/
    return (
        <form onSubmit={handleSubmit}>
            {/*<PaymentElement />*/}
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <button type={'submit'}>Submit</button>
        </form>
    );
};

export default StripeForm;