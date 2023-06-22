import NextLink from "next/link";
import * as React from "react";
import { Fragment, useState } from "react";
import { faX, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { ExProduct } from "@types";
import { removeProduct } from "@redux/actions";
import { useRouter } from "next/router";
import { formatCurrency } from "@utils/formatNumber";
import useCart from "@hooks/useCart";
import { updateFullCart } from "@redux/slices/cart";
import useUser from "@hooks/useUser";
import { GET } from "@utils/fetch";
import useSWR from "swr";
//
const CartPopover: React.FC = () => {
  const router = useRouter();
  const { cart, removeProductToCart } = useCart();
  const products = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];
  const { isAuthenticated } = useUser();
  async function getCart() {
    const res = await GET("/api/checkout/cart");
    return res.data;
  }
  const { data } = useSWR("get-cart-server", getCart);
  const cartItem = data?.order_item;
  const dispatch = useDispatch();
  const totalProducts = products?.reduce((pre, curr) => pre + curr.quantity, 0);
  const totalMoney = products?.reduce(
    (pre, curr) => pre + curr.quantity * Number.parseFloat(curr.price || "0"),
    0
  );

  const [showModal, setShowModal] = useState(false);
  // console.log(cart?.data?.order_item);
  const handleRemoveProduct = async (exProduct: ExProduct) => {
    if (isAuthenticated) {
      const totalPrice =
        exProduct.quantity * Number.parseFloat(exProduct.product.price || "0");
      const res = await removeProductToCart({
        order_item_id: exProduct.id,
        total_amount: totalProducts - exProduct.quantity,
        total_price: totalMoney - totalPrice,
        weight: exProduct.product.weight,
      });
      if (res.status === 200) dispatch(removeProduct(exProduct));
    } else dispatch(removeProduct(exProduct));
  };

  React.useEffect(() => {
    if (cart?.status === 200) {
      const orderItem = cart?.data?.order_item?.map((item: any) => ({
        ...item,
        quantity: item?.amount,
        orderId: item?.id,
        packageName: item?.packaging,
      }));
      if (orderItem) {
        //update to localstorage
        dispatch(updateFullCart(orderItem));
      }
    }
  }, [cart]);

  return (
    <Fragment>
      <div>
        <NextLink href="#">
          <a>
            <span className={"relative inline-flex"}>
              <FontAwesomeIcon
                className="hover:opacity-[0.5]  w-8 h-8"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}
                icon={faBagShopping}
                fontSize={"1.5rem"}
              />
              <span
                className={
                  "absolute top-badge mb-3 right-0 px-1 h-3 text-xs font-bold leading-none text-red-100 transform bg-red-500 rounded-full"
                }
              >
                {totalProducts}
              </span>
            </span>
          </a>
        </NextLink>
        {showModal && (
          <div
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
            className="fixed right-[15px] top-[25px] z-50"
          >
            <div className="mt-8 w-[330px] max-h-[700px] border shadow-md rounded-md bg-white p-4 py-5">
              <FontAwesomeIcon
                icon={faX}
                fontSize={"1.5rem"}
                style={{ color: "#ccc" }}
                onClick={() => setShowModal(false)}
                className={"float-right"}
              />
              <br />
              {products.length > 0 ? (
                <div>
                  <div className="overflow-y-auto max-h-[400px]">
                    {products?.map((item: ExProduct) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-9 border-b-[1px] p-4 "
                      >
                        <NextLink href={`/product/${item?.product.id}`}>
                          <img
                            className="col-span-2 cursor-pointer"
                            src={(item?.product as any)?.url_image}
                            // src={item?.image}
                            alt={item?.product?.name}
                          />
                        </NextLink>
                        <div className="col-span-6 ml-6 flex-row">
                          {/* {item?.packageName ? (
                            <div>{item?.product?.name + '-' + item?.packageName}</div>
                          ) : (
                            <div>{item?.product?.name}</div>
                          ) } */}
                          {item?.packageName && !item?.capacity ? (
                            <div>
                              {item?.product?.name + "-" + item?.packageName}
                            </div>
                          ) : item?.color ? (
                            <div>{item?.product?.name + "-" + item?.color}</div>
                          ) : item?.capacity ? (
                            <div>
                              {item?.product?.name +
                                "-" +
                                item?.capacity +
                                ", " +
                                item?.packageName}
                            </div>
                          ) : (
                            <div>{item?.product?.name}</div>
                          )}

                          <div className="text-gray-400 font-bold">{`${
                            item?.quantity
                          } x ${formatCurrency(String(item?.price))} €`}</div>
                        </div>
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          fontSize={"1.5rem"}
                          style={{ color: "#ccc" }}
                          onClick={() => handleRemoveProduct(item)}
                          className={
                            "float-right mt-auto bottom-0 cursor-pointer"
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid border-b-[1px] p-4">
                    <strong className="m-auto  text-[#603813] font-bold text-[20px]">
                      {`Sous-total: ${formatCurrency(String(totalMoney))} €`}
                    </strong>
                  </div>

                  <button
                    onClick={async () => {
                      isAuthenticated
                        ? await router.push("/checkout")
                        : await router.replace("/my-account");
                    }}
                    className="bg-[#61CE70] w-full p-3 rounded-[5px] mt-5"
                  >
                    Commander
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              {/* <div>{products ? <>item</> : <>No products in the cart</>}</div> */}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CartPopover;
