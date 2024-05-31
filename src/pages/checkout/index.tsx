import BillingInfomation from "@components/checkout/BillingInfomation";
import { Container } from "@components/container";
// import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import useCart from "@hooks/useCart";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { clearCart } from "@redux/slices/cart";
import { api } from "@utils/apiRoute";
import { POST } from "@utils/fetch";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export type billingInfo = {
  company: string;
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  postal_code: string;
  address: string;
  send_mail?: boolean;
};

const paypalOptions = {
  clientId:
    "AawsPqPhcFo1T4fNy5NScaPA0FZYtb6JaP3xTsC9rY58QXZwO0NGWGVnzk3zXr0bMGKEqU2Jxdu_YR0A",
  currency: "USD",
  debug: true,
};

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cart } = useCart();
  const [isOpenPaypal, setIsOpenPaypal] = useState(false);
  const [formValue, setFormValue] = useState<null | billingInfo>(null);

  const dispatch = useDispatch();

  const handleOpenPaypal = (data: billingInfo) => {
    setFormValue(data);
    setIsOpenPaypal(true);
  };

  async function onApprove(data: { orderID: string }) {
    try {
      const res = await POST(api.create_capture, {
        payment_id: data.orderID,
        send_mail: formValue?.send_mail,
      });

      if (res.status === 200) {
        dispatch(clearCart());
        router.push("/success");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
  async function createOrder() {
    try {
      const newCart = cart?.data?.results?.map((item: any) => {
        return {
          ...item,
          capacity: item?.capacity?.id,
          color: item?.color?.id,
          package: item?.package?.id,
        };
      });

      const payload = {
        ...formValue,
        items: newCart,
      };
      const res = await POST(api.create_order, payload);

      if (res.status === 201 || res.status === 200) return res.data?.payment_id;
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  if (cart?.data?.results?.length === 0) {
    router.push("/");
    return null;
  }
  return (
    <Container>
      <div className="mt-2 md:m-20">
        <div className="items-start mt-7 md:flex">
          <div className="my-2 px-5 py-2 w-full col-span-5 bg-[#FBFBFB]">
            <div
              className={` transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
            >
              <BillingInfomation handleOpenPaypal={handleOpenPaypal} />
            </div>
          </div>
        </div>
        {isOpenPaypal && (
          <div className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div className="shadow w-[21rem] bg-white h-1/4 p-2 modal-box">
              <div className={"flex justify-between my-2"}>
                <div className={"w-[5rem]"} />
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={() => setIsOpenPaypal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="mx-3">
                <PayPalScriptProvider options={paypalOptions}>
                  <PayPalButtons
                    style={{
                      color: "blue",
                      shape: "rect",
                      height: 50,
                      layout: "vertical",
                      label: "pay",
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    forceReRender={[formValue]}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Checkout;
