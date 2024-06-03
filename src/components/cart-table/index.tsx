import useCart from "@hooks/useCart";
import useDebouncedCallback from "@hooks/useDebouncedCallback";
import { removeProduct } from "@redux/actions";
import { updateProduct } from "@redux/slices/cart";
import { showToast } from "@redux/slices/toast/toastSlice";
import { ExProduct } from "@types";
import { api } from "@utils/apiRoute";
import { POST } from "@utils/fetch";
import { isEmpty } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";
import UpdateCart from "./UpdateCart";

const CartTable = () => {
  const { cart, removeProductToCart, refresh, updateProductToCart, isLoading } =
    useCart();

  const dispatch = useDispatch();

  const [isOpenUpdateProduct, setIsOpenUpdateProduct] = useState(false);
  const [voucher, setVoucher] = useState<string>("");
  const [priceVoucher, setPriceVoucher] = useState<number>(0);
  const [productSelected, setProductSelected] = useState<ExProduct | null>(
    null
  );

  const handleRemoveProduct = async (exProduct: ExProduct) => {
    const res = await removeProductToCart(exProduct.id?.toString() || "");

    if (res.status === 200) {
      dispatch(removeProduct(exProduct));
      refresh();
    } else {
      dispatch(showToast({ message: "Fail to remove product!", error: true }));
    }
  };

  const handleUpdateQuantity = async (
    exProduct: ExProduct,
    quantity: number
  ) => {
    try {
      const res = await updateProductToCart({
        data: [
          {
            ...exProduct,
            id: exProduct.id,
            quantity: quantity,
            color: exProduct?.color?.id,
            capacity: exProduct?.capacity?.id,
            package: exProduct?.package?.id,
          },
        ],
      });
      if (res.status === 200) {
        dispatch(updateProduct({ ...exProduct, quantity: quantity }));
        refresh();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddVoucher = async () => {
    if (!voucher) {
      setPriceVoucher(0);
      return;
    }

    if (priceVoucher) {
      setPriceVoucher(0);
    }

    try {
      const payload = {
        voucher_code: voucher,
        total_price: cart?.data?.total_price_item,
      };

      const res = await POST(api.apply_voucher, payload);

      if (res.status === 200) {
        setPriceVoucher(res.data?.price);
        dispatch(
          showToast({ message: "Add voucher successfully!", error: false })
        );
      } else {
        setPriceVoucher(0);
        dispatch(showToast({ message: "Voucher invalid!", error: true }));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const debouncedUpdateQuantity = useDebouncedCallback(
    handleUpdateQuantity,
    500
  );

  const handleCloseUpdate = () => {
    setIsOpenUpdateProduct(false);
    setTimeout(() => {
      setProductSelected(null);
    }, 300);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "." || e.key === ",") e.preventDefault();
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="text-[#603813]">
      {isEmpty(cart?.data?.results) ? (
        <EmptyCart />
      ) : (
        <>
          <div className="border border-[#BFBFBF] overflow-auto ">
            <table className="text-[#603813] relative w-full text-sm text-left border rtl:text-right min-w-fit ">
              <thead className="  text-base font-bold sticky top-0 w-full h-[50px] align-middle border border-[#838282]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-2 border whitespace-nowrap min-w-[80px] w-12 max-w-[80px]"
                    key={1}
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-2 border whitespace-nowrap w-[120px]"
                    key={2}
                  >
                    Image
                  </th>
                  <th
                    key={3}
                    scope="col"
                    className="px-6 py-2 border whitespace-nowrap"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    key={5}
                    className="px-6 py-2 border w-[100px]"
                  >
                    Price
                  </th>
                  <th scope="col" key={6} className="px-6 py-2 border w-14">
                    Quantity
                  </th>
                  <th
                    scope="col"
                    key={7}
                    className="px-6 py-2 border w-14 whitespace-nowrap "
                  >
                    Sub-total
                  </th>
                </tr>
              </thead>
              <tbody className="w-full ">
                {cart?.data?.results?.map((item: ExProduct) => (
                  <tr key={item.id} className="bg-[#F6F6F6] border text-base">
                    <td className="px-6 py-2 border max-w-12 ">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto cursor-pointer max-w-12"
                        onClick={() => handleRemoveProduct(item)}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99995 9.41415L13.6569 15.0711C13.8455 15.2533 14.0982 15.3541 14.3603 15.3518C14.6225 15.3495 14.8734 15.2444 15.0588 15.059C15.2442 14.8736 15.3493 14.6227 15.3516 14.3606C15.3539 14.0984 15.2531 13.8458 15.0709 13.6571L9.41395 8.00015L15.0709 2.34315C15.2531 2.15455 15.3539 1.90194 15.3516 1.63975C15.3493 1.37755 15.2442 1.12674 15.0588 0.941331C14.8734 0.755923 14.6225 0.650754 14.3603 0.648475C14.0982 0.646197 13.8455 0.746991 13.6569 0.929149L7.99995 6.58615L2.34295 0.929149C2.15349 0.751494 1.90236 0.654515 1.64268 0.658732C1.38299 0.662948 1.13514 0.768031 0.951555 0.951743C0.767972 1.13546 0.663065 1.38339 0.659032 1.64307C0.654999 1.90276 0.752156 2.15382 0.929945 2.34315L6.58595 8.00015L0.928945 13.6571C0.833435 13.7494 0.757253 13.8597 0.704844 13.9817C0.652435 14.1037 0.624849 14.235 0.623695 14.3677C0.622541 14.5005 0.647843 14.6322 0.698124 14.7551C0.748404 14.878 0.822658 14.9897 0.91655 15.0835C1.01044 15.1774 1.1221 15.2517 1.24499 15.302C1.36789 15.3523 1.49957 15.3776 1.63235 15.3764C1.76513 15.3752 1.89635 15.3477 2.01835 15.2953C2.14035 15.2428 2.2507 15.1667 2.34295 15.0711L7.99995 9.41415Z"
                          fill="#FF0000"
                        />
                      </svg>
                    </td>

                    <td className="px-6 py-2 border">
                      <Image
                        src={item?.thumbnail?.url}
                        alt="thumbnail"
                        width={60}
                        height={40}
                        className="object-cover h-12 rounded-lg w-14"
                      />
                    </td>
                    <td className="px-6 py-2 border text-[#CC3366] underline ">
                      <div
                        className="cursor-pointer w-fit"
                        onClick={() => {
                          setProductSelected(item);
                          setIsOpenUpdateProduct(true);
                        }}
                      >
                        {item?.product_name}{" "}
                        {(item.capacity?.name ||
                          item.package?.name ||
                          item.color?.name) &&
                          "-"}{" "}
                        {item.color?.name &&
                          `${item.color?.name} ${
                            item.capacity || item.package ? "," : ""
                          } `}{" "}
                        {item.capacity?.name &&
                          `${item.capacity?.name} ${
                            item.package ? "," : ""
                          }`}{" "}
                        {item.package?.name && `${item.package?.name}`}
                      </div>
                    </td>
                    <td className="px-6 py-2 font-medium border">
                      ${Number(item?.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-2 border ">
                      <input
                        type="number"
                        className="max-w-20 border-[#BFBFBF]"
                        min={1}
                        max={999}
                        onFocus={(e) => e.preventDefault()}
                        onFocusCapture={(e) => e.preventDefault()}
                        onKeyDown={onKeyDown}
                        onChange={(e) => {
                          if (+e.target.value > 1000) return;
                          debouncedUpdateQuantity(item, +e.target.value);
                        }}
                        defaultValue={item?.quantity}
                      />
                    </td>
                    <td className="px-6 py-2 font-medium border">
                      ${Number(item?.sub_total_price).toFixed(2)}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-4 p-4">
              <input
                type="text"
                className="rounded-md border-[#BFBFBF] h-9 placeholder:text-[#BFBFBF]"
                placeholder="Promo Code"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              />
              <div
                onClick={handleAddVoucher}
                className="min-w-[180px] whitespace-nowrap h-9 flex justify-center items-center font-bold cursor-pointer text-white bg-[#603813] rounded-lg"
              >
                Apply promo code
              </div>
            </div>
          </div>
          <div className="pt-10 ml-auto md:w-[500px] w-full">
            <div className="text-[#603813] text-[32px] font-bold mb-6">
              Total basket
            </div>

            <table className="border border-[#BFBFBF] p-2">
              <tbody className="font-medium">
                <tr className="border-b  border-[#BFBFBF] bg-[#f6f6f6]">
                  <td className="px-2 py-3 font-bold min-w-[100px] md:min-w-[160px]">
                    Sub-total
                  </td>
                  <td className="px-2 py-3">
                    {cart?.data?.total_price_item &&
                      `$ ${Number(cart?.data?.total_price_item).toFixed(2)}`}
                  </td>
                </tr>
                <tr className="border-b border-[#BFBFBF] bg-[#f6f6f6]">
                  <td className="px-2 py-3 font-bold">Voucher</td>
                  <td className="px-2 py-3">
                    {+priceVoucher - +cart?.data?.total_price > 0
                      ? +priceVoucher - +cart?.data?.total_price
                      : 0}
                  </td>
                </tr>
                <tr className="border-b border-[#BFBFBF]">
                  <td className="px-2 py-3 font-bold align-top center">
                    Shipping
                  </td>
                  <td className="px-2 py-3">
                    The post office{" "}
                    <span className="font-bold">
                      $ {cart?.data?.shipping_fee?.toFixed(2)}
                    </span>
                    <div>Delivery options will be updated upon ordering.</div>
                    <div className="flex items-center gap-2 mt-2 underline text-[#CC3366]">
                      Calculate shipping costs
                      <span>
                        <svg
                          width="22"
                          height="17"
                          viewBox="0 0 22 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.7821 7.37505L18.6461 3.83205C18.4894 3.57504 18.2697 3.36238 18.0076 3.2143C17.7456 3.06622 17.45 2.98764 17.1491 2.98605H15.4721V2.73705C15.4721 2.37746 15.4011 2.02141 15.2631 1.68934C15.1251 1.35728 14.9229 1.05574 14.6681 0.802051C14.153 0.28852 13.4554 0.000118683 12.7281 5.12881e-05H2.74506C2.20178 -0.00327696 1.66985 0.15545 1.21723 0.455949C0.764609 0.756448 0.411862 1.18507 0.204062 1.68705C0.066979 2.02002 -0.00237166 2.37697 6.18945e-05 2.73705V11.6951C0.000413961 12.1158 0.153317 12.5222 0.430425 12.8388C0.707532 13.1555 1.09005 13.3609 1.50706 13.4171C1.50206 13.5071 1.50206 13.5971 1.50706 13.6861C1.50333 14.1102 1.58539 14.5307 1.7483 14.9224C1.91121 15.314 2.15161 15.6687 2.45506 15.9651C2.75276 16.2747 3.10904 16.5222 3.5032 16.693C3.89735 16.8638 4.32152 16.9546 4.75106 16.9601C5.60842 16.9524 6.42868 16.6092 7.03606 16.0041C7.64296 15.3999 7.98779 14.5813 7.99606 13.7251C8.00101 13.6425 8.00101 13.5596 7.99606 13.4771H13.5051C13.5001 13.5596 13.5001 13.6425 13.5051 13.7251C13.5011 14.1494 13.5831 14.5701 13.746 14.9619C13.9089 15.3538 14.1494 15.7086 14.4531 16.0051C14.751 16.315 15.1076 16.5626 15.5021 16.7335C15.8966 16.9043 16.3212 16.9949 16.7511 17.0001C17.6084 16.9925 18.4287 16.6493 19.0361 16.0441C19.6426 15.4398 19.9871 14.6212 19.9951 13.7651C20.0001 13.6821 20.0001 13.599 19.9951 13.5161H20.7511C20.9483 13.5132 21.1367 13.4338 21.2765 13.2946C21.4163 13.1554 21.4964 12.9673 21.5001 12.7701V9.89405C21.5001 9.00405 21.2511 8.13205 20.7821 7.37505ZM6.48806 13.6851C6.48905 13.9137 6.44355 14.1403 6.35434 14.3508C6.26512 14.5614 6.13404 14.7517 5.96906 14.9101C5.63638 15.2262 5.19498 15.4024 4.73606 15.4024C4.27714 15.4024 3.83575 15.2262 3.50306 14.9101C3.34099 14.7482 3.21264 14.5558 3.12544 14.3439C3.03825 14.1321 2.99393 13.9051 2.99506 13.6761C2.99063 13.4395 3.03843 13.205 3.13506 12.9891C3.26706 12.6761 3.49406 12.4121 3.78306 12.2321C4.07865 12.0367 4.42683 11.9362 4.78106 11.9441C5.11906 11.9441 5.44906 12.0441 5.72906 12.2321C6.01606 12.4151 6.24206 12.6781 6.37906 12.9891C6.47706 13.2041 6.52906 13.4391 6.52806 13.6761L6.48806 13.6851ZM9.73206 8.70905H4.74206C4.47788 8.70879 4.22454 8.604 4.03736 8.41758C3.85019 8.23115 3.74438 7.97823 3.74306 7.71405C3.7428 7.58301 3.76845 7.45321 3.81853 7.33212C3.86862 7.21103 3.94215 7.10104 4.0349 7.00847C4.12765 6.91591 4.23779 6.8426 4.35898 6.79275C4.48017 6.74291 4.61002 6.71752 4.74106 6.71805H9.73206C9.99624 6.71858 10.2495 6.82362 10.4365 7.01023C10.6235 7.19685 10.729 7.44987 10.7301 7.71405C10.7302 7.84501 10.7044 7.9747 10.6543 8.09567C10.6042 8.21665 10.5306 8.32652 10.4379 8.41898C10.3451 8.51144 10.235 8.58466 10.1139 8.63444C9.99278 8.68422 9.86302 8.70958 9.73206 8.70905ZM9.73206 5.28505H4.74206C4.47788 5.28479 4.22454 5.18 4.03736 4.99358C3.85019 4.80715 3.74438 4.55423 3.74306 4.29005C3.74293 4.1591 3.76867 4.02941 3.81882 3.90843C3.86896 3.78746 3.94252 3.67758 4.03526 3.58512C4.12799 3.49266 4.23809 3.41944 4.35921 3.36966C4.48034 3.31988 4.61011 3.29452 4.74106 3.29505H9.73206C9.99607 3.29558 10.2492 3.40048 10.4361 3.58688C10.6231 3.77328 10.7287 4.02605 10.7301 4.29005C10.7302 4.42101 10.7044 4.5507 10.6543 4.67167C10.6042 4.79265 10.5306 4.90252 10.4379 4.99498C10.3451 5.08744 10.235 5.16066 10.1139 5.21044C9.99278 5.26022 9.86302 5.28558 9.73206 5.28505ZM18.4661 13.6851C18.467 13.9138 18.4214 14.1404 18.332 14.351C18.2426 14.5616 18.1113 14.7518 17.9461 14.9101C17.6134 15.2259 17.1722 15.402 16.7136 15.402C16.2549 15.402 15.8137 15.2259 15.4811 14.9101C15.3188 14.7483 15.1903 14.5559 15.1029 14.3441C15.0155 14.1322 14.9711 13.9052 14.9721 13.6761C14.9678 13.3135 15.0839 12.9597 15.3021 12.6701C15.5481 12.3431 15.9011 12.1101 16.3001 12.0131H16.5501C16.5958 12.0029 16.6433 12.0029 16.6891 12.0131H16.8891C17.1921 12.0481 17.4811 12.1611 17.7271 12.3421C17.9741 12.5231 18.1671 12.7671 18.2861 13.0491C18.3851 13.2641 18.4361 13.4991 18.4361 13.7351L18.4661 13.6851Z"
                            fill="#CC3366"
                          />
                          <path
                            d="M16.7111 11.9336C16.665 11.9232 16.6172 11.9232 16.5711 11.9336H16.7111Z"
                            fill="#CC3366"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>

                <tr className="border-b  border-[#BFBFBF] bg-[#f6f6f6]">
                  <td className="px-2 py-3 font-bold min-w-[100px] md:min-w-[160px]">
                    VAT
                  </td>
                  <td className="px-2 py-3">
                    $ {cart?.data?.tax_fee && cart?.data?.tax_fee}
                  </td>
                </tr>
                <tr className="border-b border-[#BFBFBF] ">
                  <td className="px-2 py-3 font-bold">Total</td>
                  <td className="px-2 py-3">
                    {`$ ${Number(
                      priceVoucher ? priceVoucher : +cart?.data?.total_price
                    ).toFixed(2)}`}
                  </td>
                </tr>
              </tbody>
            </table>
            <Link
              href={`/checkout${priceVoucher > 0 ? `?voucher=${voucher}` : ""}`}
            >
              <div className="w-full h-16 font-bold bg-[#603813] text-white mt-8 rounded-lg flex justify-center items-center cursor-pointer">
                Validate the order
              </div>
            </Link>
          </div>
        </>
      )}
      <UpdateCart
        isOpen={isOpenUpdateProduct}
        setIsOpen={handleCloseUpdate}
        order={productSelected}
        refresh={refresh}
      />
    </div>
  );
};

export default CartTable;
