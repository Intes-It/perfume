import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import useCart from "@hooks/useCart";
import { updateFullCart } from "@redux/slices/cart";
import { ExProduct } from "@types";
import Link from "next/link";
//
const CartPopover: React.FC = () => {
  const products = useSelector(
    (state: any) => state?.cart?.products
  ) as ExProduct[];

  const { cart } = useCart();
  const dispatch = useDispatch();

  const totalProducts = products?.reduce(
    (pre, curr) => pre + +curr.quantity,
    0
  );

  React.useEffect(() => {
    if (cart?.status === 200) {
      //update to localstorage
      dispatch(updateFullCart(cart?.data?.results));
    }
  }, [cart]);

  return (
    <Link href="/cart">
      <span className={"relative inline-flex cursor-pointer"}>
        <FontAwesomeIcon
          className="hover:opacity-[0.5]  w-6 h-6"
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
  );
};

export default CartPopover;
