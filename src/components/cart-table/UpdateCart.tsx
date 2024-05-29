import Rating from "@components/rating/rating";
import { Dialog, Transition } from "@headlessui/react";
import { useProductDetail } from "@hooks/useProduct";
import { updateProduct } from "@redux/slices/cart";
import { showToast } from "@redux/slices/toast/toastSlice";
import { ExProduct } from "@types";
import { api } from "@utils/apiRoute";
import { PUT } from "@utils/fetch";
import { formatCurrency } from "@utils/formatNumber";
import { AxiosResponse } from "axios";
import _ from "lodash";
import Image from "next/image";
import { Fragment, useMemo, useRef, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

type UpdateProductProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  order: ExProduct | null;
  refresh?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any> | undefined, unknown>>;
};

type optionType = {
  current_price?: number;
  id: number;
  name: string;
  price: number;
  weight?: number;
  color?: string;
};

function UpdateCart({ isOpen, setIsOpen, order, refresh }: UpdateProductProps) {
  if (!order) return null;

  const { product, isLoading } = useProductDetail({
    id: order.product_id.toString(),
  });

  const cancelButtonRef = useRef(null);
  const [isError, setIsError] = useState({
    type: "",
    message: "",
  });
  const [packageSelected, setPackageSelected] = useState<optionType | null>(
    order?.package
  );
  const [capacitySelected, setCapacitySelected] = useState<optionType | null>(
    order?.capacity
  );
  const [colorSelected, setColorSelected] = useState<optionType | null>(
    order?.color
  );
  const [quantity, setQuantity] = useState<number>(order?.quantity || 1);
  const [selectorImage, setSelectorImage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleUpdateProduct = async () => {
    if (!product) return;

    const payload = {
      data: [
        {
          id: order.id,
          color: colorSelected?.id,
          package: packageSelected?.id,
          capacity: capacitySelected?.id,
          quantity: quantity,
        },
      ],
    };

    try {
      const res = await PUT(api.updateProduct, payload);

      if (res.status === 200) {
        dispatch(updateProduct(payload.data[0]));
        dispatch(showToast({ message: "Update successfully!", error: false }));
        setIsOpen(false);
        if (refresh) refresh();
      } else {
        dispatch(showToast({ message: "Update Fail!", error: true }));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const sumChoice = useMemo(() => {
    return (
      (product?.current_price || product?.price) +
      (packageSelected?.price || 0) +
      (capacitySelected?.price || 0) +
      (colorSelected?.price || 0)
    );
  }, [packageSelected, capacitySelected, colorSelected, product]);

  if (isLoading) {
    return null;
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        className="relative"
        style={{
          zIndex: 9999,
        }}
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-[1000px] p-6 overflow-hidden text-left transition-all transform bg-white rounded-md shadow-xl ">
                <div className="flex items-center justify-between ">
                  <div className="text-2xl font-semibold">Update cart</div>
                  <svg
                    width="18"
                    height="18"
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 10.75L2.875 16.875C2.64583 17.1042 2.35417 17.2188 2 17.2188C1.64583 17.2188 1.35417 17.1042 1.125 16.875C0.895833 16.6458 0.78125 16.3542 0.78125 16C0.78125 15.6458 0.895833 15.3542 1.125 15.125L7.25 9L1.125 2.875C0.895833 2.64583 0.78125 2.35417 0.78125 2C0.78125 1.64583 0.895833 1.35417 1.125 1.125C1.35417 0.895833 1.64583 0.78125 2 0.78125C2.35417 0.78125 2.64583 0.895833 2.875 1.125L9 7.25L15.125 1.125C15.3542 0.895833 15.6458 0.78125 16 0.78125C16.3542 0.78125 16.6458 0.895833 16.875 1.125C17.1042 1.35417 17.2188 1.64583 17.2188 2C17.2188 2.35417 17.1042 2.64583 16.875 2.875L10.75 9L16.875 15.125C17.1042 15.3542 17.2188 15.6458 17.2188 16C17.2188 16.3542 17.1042 16.6458 16.875 16.875C16.6458 17.1042 16.3542 17.2188 16 17.2188C15.6458 17.2188 15.3542 17.1042 15.125 16.875L9 10.75Z"
                      fill="#1D1D1D"
                    />
                  </svg>
                </div>
                <div className="flex gap-6 py-6">
                  <Image
                    src={selectorImage || product?.images[0]?.url}
                    loading="lazy"
                    className="object-contain w-1/2 min-w-[50%] h-[450px]"
                    alt="product"
                    width={500}
                    height={450}
                  />
                  <div className="flex flex-col">
                    <div className="text-2xl font-normal">{product?.name}</div>
                    <div className="flex gap-2 my-2">
                      <Rating score={product?.rating || 0} />
                      <span>( 0 review )</span>
                    </div>
                    <div className="text-xl font-semibold">
                      {formatCurrency(sumChoice.toString())} €{" "}
                    </div>
                    <div className="my-3 ">
                      {_.isEmpty(product?.color) ? null : (
                        <span className="flex font-semibold mb-4 text-[#603813] ">
                          Color :
                          <span className="grid font-medium">
                            {colorSelected?.name}{" "}
                          </span>
                        </span>
                      )}
                      <div className="flex gap-3 mt-4">
                        {product?.color &&
                          product.color?.map((item: any, index: number) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (item.image) setSelectorImage(item.image);
                                setColorSelected(item);
                              }}
                              style={{
                                background: `${item.color}`,
                              }}
                              className={twMerge(
                                "mb-3 border p-2 text-white outline-none",
                                colorSelected?.id === item?.id && "border-black"
                              )}
                            >
                              {/* //  className={`mb-3 border p-2 text-white border-black bg-[#50d71e]`}>  */}
                              {item?.name}
                            </button>
                          ))}
                      </div>
                    </div>
                    {/* sub product */}
                    <div className="flex gap-1 mt-4 mb-3 ">
                      {!_.isEmpty(product?.capacity) && (
                        <div
                          role="tabpanel"
                          className={` text-[#603813] transition-opacity duration-150 ease-linear `}
                        >
                          {capacitySelected?.name && (
                            <div className="flex">
                              <strong>Contenance :</strong>
                              <span className="grid font-medium">
                                {capacitySelected?.name}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <ul
                        className="flex flex-col flex-wrap gap-2 pl-0 list-none border-b-0 md:flex-row"
                        id="tabs-tab"
                        role="tablist"
                      >
                        {product?.capacity &&
                          product.capacity?.map((item: any, index: number) => (
                            <li role="presentation" key={index}>
                              <button
                                // href={"#" + capacityName[index]}
                                className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate ${
                                  capacitySelected?.id === item?.id &&
                                  "border-[#6A5950]"
                                } " `}
                                onClick={() => {
                                  if (isError.type)
                                    setIsError({
                                      ...isError,
                                      type: "",
                                    });
                                  setCapacitySelected(item);
                                }}
                              >
                                {item?.name}
                              </button>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* packaging */}
                    <div className="flex gap-1 mt-4 mb-3 ">
                      {!_.isEmpty(product?.package) && (
                        <div
                          role="tabpanel"
                          className={`mb-4  text-[#603813]    transition-opacity duration-150 ease-linear `}
                        >
                          <strong>Packaging</strong> : {packageSelected?.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <ul
                        className="flex flex-col flex-wrap gap-2 pl-0 list-none border-b-0 md:flex-row"
                        id="tabs-tab"
                        role="tablist"
                      >
                        {product?.package &&
                          product.package?.map((item: any, index: number) => (
                            <li role="presentation" key={index}>
                              <button
                                // href={"#" + namePackaging[index]}
                                className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate focus:isolate hover:border-transparent hover:bg-neutral-100   ${
                                  packageSelected?.id === item?.id
                                    ? "border-[#6A5950]"
                                    : ""
                                } `}
                                onClick={() => {
                                  const selectorImage = item?.image;
                                  setPackageSelected(item);
                                  if (isError.type)
                                    setIsError({
                                      ...isError,
                                      type: "",
                                    });
                                  setSelectorImage(selectorImage);
                                }}
                                role="tab"
                              >
                                {item?.name}
                              </button>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* add product to cart */}
                    {isError.type && (
                      <div className="mt-3 text-[#FF2626] font-semibold">
                        {isError.message}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-6">
                      <input
                        value={quantity}
                        onChange={(e: any) => {
                          if (+e.target.value.charAt(0) === 0) {
                            e.target.value = e.target.value.substring(1);
                          }
                          const newValue = Number.parseInt(e.target.value) || 0;
                          if (newValue > 0 && isError.type)
                            setIsError({ ...isError, type: "" });
                          if (newValue <= 999) {
                            setQuantity(newValue);
                          }
                        }}
                        type="number"
                        className="w-16 h-10 p-1 text-center border outline-none border-gray"
                        min={0}
                        max={999}
                        placeholder={"1"}
                      />
                      <div className="flex gap-3">
                        <button
                          className="rounded-md bg-[#603813] p-5 py-3  hover:bg-black text-white font-semibold"
                          onClick={handleUpdateProduct}
                        >
                          UPDATE PRODUCT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default UpdateCart;
