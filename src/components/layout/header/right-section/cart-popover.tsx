import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import useCart from "@hooks/useCart";
import useUser from "@hooks/useUser";
import { removeProduct } from "@redux/actions";
import { updateFullCart } from "@redux/slices/cart";
import { ExProduct } from "@types";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";
import Link from "next/link";
import { useRouter } from "next/router";
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
    const res = await GET(api.getCart);
    return res.data;
  }
  const { data, mutate } = useSWR("get-cart-server", getCart);
  const cartItem = data?.order_item;

  const dispatch = useDispatch();
  const totalProducts = products?.reduce((pre, curr) => pre + curr.quantity, 0);
  const totalMoney = products?.reduce(
    (pre, curr) => pre + curr.quantity * Number.parseFloat(curr.price || "0"),
    0
  );

  // console.log(cart?.data?.order_item);
  const handleRemoveProduct = async (exProduct: ExProduct) => {
    if (isAuthenticated) {
      const totalPrice =
        exProduct.quantity * Number.parseFloat(exProduct.product.price || "0");
      const res = await removeProductToCart({
        order_item_id: exProduct.orderId,
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
        <Link href="/cart" className="cursor-pointer">
          <span className={"relative inline-flex"}>
            <FontAwesomeIcon
              className="hover:opacity-[0.5]  w-8 h-8"
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
        </Link>
      </div>
    </Fragment>
  );
};

export default CartPopover;
