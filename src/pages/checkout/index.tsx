import AdditionalInformation from "@components/checkout/AdditionalInformation";
import BillingInfomation from "@components/checkout/BillingInfomation";
import OrderReview from "@components/checkout/OrderReview";
import { Container } from "@components/container";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCart from "@hooks/useCart";
import useCheckout from "@hooks/useCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import _ from "lodash";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const StepTabs = [
  {
    id: "billing-infomation-tab",
    header: "Détails de Facturation",
    href: "#billing-infomation-tab",
  },
  {
    id: "shipping-details-tab",
    header: "Détails D’expédition",
    href: "#shipping-details-tab",
  },
  {
    id: "your-order-tab",
    header: "Votre Commande",
    href: "#your-order-tab",
  },
];

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cart } = useCart();
  const { processBilling, processShipping, processYourOrder } = useCheckout();
  const [state, setState] = useState({
    activeTab: 0,
    inValidData: false,
    formErrors: {
      billingInfomation: true,
      additionalInfomation: true,
      orderReview: true,
    },
    formValues: {
      billingInfomation: {},
      additionalInfomation: {},
      orderReview: {},
    },
  });
  const { activeTab, inValidData, formErrors, formValues } = state;
  const errorDivRef = useRef<HTMLDivElement>(null);
  const stripePromise = loadStripe(
    "pk_live_51KYt28C0l8GUGmRWat1OQmGm0dQB1WG4RWWrRB2XWjFFaRxqATmJCV8h2KpoYMQeTBSs1ML9it21k4jfcwRd60Vk00LF78lSgm"
  );
  const hasError = () => {
    switch (activeTab) {
      case 0:
        return formErrors.billingInfomation;
      case 1:
        return formErrors.additionalInfomation;
      case 2:
        return formErrors.orderReview;
      default:
        return false;
    }
  };

  const showError = () => {
    setState((pre) => ({ ...pre, inValidData: true }));
    // Lấy ra vị trí của thẻ div bằng cách sử dụng method getBoundingClientRect()
    const topPos = errorDivRef.current?.getBoundingClientRect().top;
    // Scroll đến vị trí của thẻ div bằng cách sử dụng method scrollIntoView()
    window.scrollTo({ top: topPos, behavior: "smooth" });
  };

  const handlNextStep = async () => {
    if (activeTab < 2) {
      if (hasError()) showError();
      else {
        if (activeTab == 0) {
          const res = await processBilling({
            ...formValues.billingInfomation,
            order_id: cart?.data?.cart?.id || null,
          });
          if (res?.status === 200 && res?.data?.created_time)
            setState((pre) => ({
              ...pre,
              inValidData: false,
              activeTab: activeTab + 1,
            }));
        } else if (activeTab == 1) {
          const res = await processShipping({
            ...formValues.additionalInfomation,
            order_id: cart?.data?.cart?.id || null,
          });
          if (res?.status === 200 && res?.data?.created_time)
            setState((pre) => ({
              ...pre,
              inValidData: false,
              activeTab: activeTab + 1,
            }));
        }
      }
    }
  };

  const handleOder = async () => {
    const res = await processYourOrder({
      order_id: cart?.data?.cart?.id || null,
    });
    if (res?.status === 200 && res?.data?.link) router.push(res?.data?.link);
  };

  return (
    <Container>
      <div className=" mt-2 md:m-20">
        <div className="border-t-[3px] border-[#603813] bg-[#F7F6F7] p-5">
          <FontAwesomeIcon
            className="mr-3"
            fontSize={"1.2rem"}
            icon={faWindowMaximize}
          />
          <span>
            Avez-vous un code promo ? Cliquez ici pour saisir votre code
          </span>
        </div>

        {/* tabs */}
        <div className=" items-start mt-7 md:flex">
          <ul className="mr-4 flex list-none flex-col flex-wrap pl-0 col-span-2">
            {StepTabs?.map((item, index) => (
              <div
                key={index}
                className="flex-grow text-center pointer-events-none"
              >
                <span
                  className={`my-[1px] min-w-[100px] block border-x-0 font-semibold rounded-md border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-sm  uppercase leading-tight text-neutral-500
                          focus:border-transparent 
                          ${
                            index === activeTab
                              ? "bg-[#603813] text-white"
                              : "bg-[#B2B2B0]"
                          } `}
                >
                  {item?.header}
                </span>
              </div>
            ))}
          </ul>
          <div className="my-2 px-5 py-2 w-full col-span-5 bg-[#FBFBFB]">
            {/* error */}
            <div
              ref={errorDivRef}
              className={`${
                !inValidData && "hidden"
              } border-t-[3px] border-t-red-700 p-4 mb-16 bg-[#F7F6F7]`}
            >
              <FontAwesomeIcon
                icon={faWarning}
                fontSize={"1.0rem"}
                className={"w-10 h-10 text-red-700"}
              />
              <span>Invalid or data missing in the required field(s)</span>
            </div>
            <div
              className={`${
                activeTab !== 0 && "hidden"
              } transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
            >
              <BillingInfomation
                onError={(errors) => {
                  setState((pre) => ({
                    ...pre,
                    formErrors: {
                      ...formErrors,
                      billingInfomation: !_.isEmpty(errors),
                    },
                  }));
                }}
                onValueChange={(values) => {
                  setState((pre) => ({
                    ...pre,
                    formValues: { ...formValues, billingInfomation: values },
                  }));
                }}
              />
            </div>
            <div
              className={`${
                activeTab !== 1 && "hidden"
              } transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
            >
              <AdditionalInformation
                onError={(errors) => {
                  setState((pre) => ({
                    ...pre,
                    formErrors: {
                      ...formErrors,
                      additionalInfomation: !_.isEmpty(errors),
                    },
                  }));
                }}
                onValueChange={(values, expanded) => {
                  setState((pre) => ({
                    ...pre,
                    formValues: {
                      ...formValues,
                      additionalInfomation: expanded
                        ? values
                        : { note: values?.note },
                    },
                  }));
                }}
              />
            </div>
            <div
              className={`${
                activeTab !== 2 && "hidden"
              } transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
            >
              <Elements stripe={stripePromise}>
                <OrderReview onOderClicked={handleOder} orderID={cart?.data?.cart?.id} />
              </Elements>
            </div>

            <div className="flex float-right gap-3 mt-10 ">
              <button
                className="w-[90px] rounded-md p-3 border border-black  text-black hover:bg-black hover:text-white "
                onClick={() => {
                  if (activeTab > 0) {
                    // if (hasError())
                    //   showError();
                    // else
                    setState((pre) => ({
                      ...pre,
                      inValidData: false,
                      activeTab: activeTab - 1,
                    }));
                  }
                }}
              >
                PRÉC
              </button>
              {activeTab !== 2 && (
                <button
                  className="w-[90px] rounded-md p-3 border border-black text-black hover:bg-black hover:text-white "
                  onClick={() => {
                    handlNextStep();
                  }}
                >
                  SUIV
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
