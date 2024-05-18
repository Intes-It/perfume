import Rating from "@components/rating/rating";
import { Dialog, Transition } from "@headlessui/react";
import { updateProduct } from "@redux/slices/cart";
import { ExProduct } from "@types";
import { api } from "@utils/apiRoute";
import { PUT } from "@utils/fetch";
import { formatCurrency } from "@utils/formatNumber";
import _ from "lodash";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

type UpdateProductProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  order: ExProduct | null;
};

function UpdateCart({ isOpen, setIsOpen, order }: UpdateProductProps) {
  const product = order?.product;

  const cancelButtonRef = useRef(null);
  const [isError, setIsError] = useState({
    type: "",
    message: "",
  });
  const [state, setState] = useState({
    amount: 1,
    packagePrice: 0,
    contenancePrice: 0,
    packageName: "",
    contenance: "",
    color: undefined,
    selectorImage: "",
  });

  const {
    amount,
    packagePrice,
    packageName,
    contenance,
    contenancePrice,
    color,
    selectorImage,
  } = state;

  let namePackaging: any = [];
  if (product?.packaging) {
    namePackaging = Object?.values(product?.packaging)?.reduce(
      (a: any[], item: any) => a.concat(item?.name || ""),
      []
    );
    namePackaging.forEach((item: any, index: number) => {
      namePackaging[index] = item.replace(/\s/g, "");
    });
  }

  const dispatch = useDispatch();

  const handleUpdateProduct = async () => {
    if (!product) return;

    const payload = {
      order_item_id: order.id,
      order_id: order.order,
      color: color,
      packaging: packageName,
      capacity: contenance,
      amount: amount,
    };

    try {
      const res = await PUT(api.changeProduct, payload);

      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
    dispatch(updateProduct(payload));
  };

  useEffect(() => {
    if (order?.id) {
      const packageCurr = Object.values(order?.product?.packaging || {})?.find(
        (item: any) => item.name === order?.packaging
      ) as any;

      const capacityCurr = Object.values(order?.product?.capacity || {})?.find(
        (item: any) => item.name === order?.capacity
      ) as any;

      setState({
        ...state,
        amount: order.amount,
        packageName: order?.packaging,
        contenance: order?.capacity,
        packagePrice: +packageCurr?.price || 0,
        contenancePrice: +capacityCurr?.price || 0,
        color: order.color,
        selectorImage: order.image,
      });
    }
  }, [order?.id]);

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
                  <img
                    src={
                      selectorImage ||
                      product?.url_image ||
                      `http://171.244.64.245:8005${product?.image}`
                    }
                    loading="lazy"
                    className="object-contain w-1/2 min-w-[50%] h-[450px]"
                    alt="product"
                  />
                  <div className="flex flex-col">
                    <div className="text-2xl font-normal">{product?.name}</div>
                    <div className="flex gap-2 my-2">
                      <Rating score={product?.evaluate || 0} />
                      <span>( 0 review )</span>
                    </div>
                    <div className="text-xl font-semibold">
                      {_.isEmpty(product?.packaging) ? (
                        <>{formatCurrency(String(product?.price))} €</>
                      ) : (
                        <>
                          {packageName === "" && contenancePrice === 0
                            ? formatCurrency(String(product?.price))
                            : formatCurrency(
                                String(
                                  parseFloat(String(contenancePrice)) +
                                    parseFloat(String(packagePrice)) +
                                    parseFloat(String(product?.price))
                                )
                              )}{" "}
                          €{" "}
                        </>
                      )}
                    </div>
                    <div className="my-3">
                      {_.isEmpty(product?.color) ? null : (
                        <span className="flex font-semibold text-[#603813] ">
                          Color :
                          <span className="grid mb-3 font-medium">
                            {color}{" "}
                          </span>
                        </span>
                      )}
                      <div className="flex gap-3">
                        {product?.color
                          ? Object.values(product.color)?.map(
                              (item: any, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    const color = item?.name;
                                    setState((o) => ({
                                      ...o,
                                      color,
                                      selectorImage: item.image,
                                    }));
                                  }}
                                  style={{
                                    background: `${item.color}`,
                                  }}
                                  className={twMerge(
                                    " border p-2 text-white outline-none",
                                    color === item?.name &&
                                      "ring-[1.5px] ring-black"
                                  )}
                                >
                                  {/* //  className={`mb-3 border p-2 text-white border-black bg-[#50d71e]`}>  */}
                                  {item?.name}
                                </button>
                              )
                            )
                          : null}
                      </div>
                    </div>
                    {/* sub product */}
                    <div className="flex gap-1 mb-3 ">
                      {_.isEmpty(product?.capacity) ? (
                        <div
                          role="tabpanel"
                          className={` text-[#603813] transition-opacity duration-150 ease-linear `}
                        >
                          {product?.weight === 0 ? (
                            ""
                          ) : (
                            <div>
                              <strong>Contenance</strong> :{product?.weight}g
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          role="tabpanel"
                          className={` text-[#603813] font-medium transition-opacity duration-150 ease-linear `}
                        >
                          <strong>Contenance</strong> :{contenance}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <ul
                        className="flex flex-col flex-wrap gap-2 pl-0 list-none border-b-0 md:flex-row"
                        id="tabs-tab"
                        role="tablist"
                      >
                        {product?.capacity
                          ? Object.values(product.capacity)?.map(
                              (item: any, index: number) => (
                                <li role="presentation" key={index}>
                                  <button
                                    // href={"#" + capacityName[index]}
                                    className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate ${
                                      contenance === item?.name &&
                                      "border-[#6A5950]"
                                    } "
                          
                          `}
                                    onClick={() => {
                                      const contenancePrice = parseFloat(
                                        item?.price
                                      );
                                      const contenance = item?.name;
                                      if (isError.type)
                                        setIsError({
                                          ...isError,
                                          type: "",
                                        });
                                      setState((o) => ({
                                        ...o,
                                        contenancePrice,
                                        contenance,
                                      }));
                                    }}
                                  >
                                    {item?.name}
                                  </button>
                                </li>
                              )
                            )
                          : null}
                      </ul>
                    </div>

                    {/* packaging */}
                    <div className="flex gap-1 my-3 ">
                      {_.isEmpty(product?.packaging) ? null : (
                        <div
                          role="tabpanel"
                          className={` text-[#603813] transition-opacity duration-150 ease-linear `}
                        >
                          <strong>Packaging</strong> : {packageName}
                        </div>
                      )}
                    </div>
                    <div>
                      <ul
                        className="flex flex-col flex-wrap gap-2 pl-0 list-none border-b-0 md:flex-row"
                        id="tabs-tab"
                        role="tablist"
                      >
                        {product?.packaging
                          ? Object.values(product.packaging)?.map(
                              (item: any, index: number) => (
                                <li role="presentation" key={index}>
                                  <button
                                    // href={"#" + namePackaging[index]}
                                    className={`p-3 block border text-[#16px] leading-tight outline-none text-[#515151] font-semibold hover:isolate focus:isolate hover:border-transparent hover:bg-neutral-100   ${
                                      packageName === item?.name
                                        ? "border-[#6A5950]"
                                        : ""
                                    } `}
                                    id={namePackaging[index]}
                                    onClick={() => {
                                      const packagePrice = parseFloat(
                                        item?.price
                                      );
                                      const packageName = item?.name;
                                      const selectorImage = item?.image;
                                      if (isError.type)
                                        setIsError({
                                          ...isError,
                                          type: "",
                                        });
                                      setState((o) => ({
                                        ...o,
                                        packagePrice,
                                        packageName,
                                        selectorImage,
                                      }));
                                    }}
                                    role="tab"
                                  >
                                    {item?.name}
                                  </button>
                                </li>
                              )
                            )
                          : null}
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
                        value={amount}
                        onChange={(e: any) => {
                          if (+e.target.value.charAt(0) === 0) {
                            e.target.value = e.target.value.substring(1);
                          }
                          const newValue = Number.parseInt(e.target.value) || 0;
                          if (newValue > 0 && isError.type)
                            setIsError({ ...isError, type: "" });
                          if (newValue <= 999) {
                            setState((pre) => ({
                              ...pre,
                              amount: newValue,
                            }));
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
