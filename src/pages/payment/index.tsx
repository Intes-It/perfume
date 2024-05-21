import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import OrderReview from "@components/checkout/OrderReview";
import useCart from "@hooks/useCart";
import {clearCart} from "@redux/slices/cart";
import {useAppDispatch} from "@redux/store";
import {useRouter} from "next/router";
import useCheckout from "@hooks/useCheckout";

const Payment = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);
    const { cart } = useCart();
    const dispatch=useAppDispatch()
    const router=useRouter();
    console.log(router)
    const {processYourOrder}=useCheckout()
    const handleOder = async () => {
        const res = await processYourOrder({
            order_id: cart?.data?.cart?.id || null,
        });

        if (res?.status === 200 && res?.data?.link) {
            dispatch(clearCart());
            await router.push(res?.data?.link);
        }
    };
    return (
        <Elements stripe={stripePromise}>
            <OrderReview
                onOderClicked={handleOder}
                orderID={cart?.data?.cart?.id}
                // email={formValues.billingInfomation.email}
            />
        </Elements>
    );
};

export default Payment;