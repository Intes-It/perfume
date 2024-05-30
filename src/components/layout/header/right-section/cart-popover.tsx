import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useSelector } from "react-redux";

import useCart from "@hooks/useCart";
import { ExProduct } from "@types";
import { getCookie } from "cookies-next";
import Link from "next/link";
//
const CartPopover: React.FC = () => {
  const products = useSelector(
    (state: any) => state?.cart?.products
  ) as ExProduct[];

  const access = getCookie("access_token");

  const { refresh } = useCart();

  const totalProducts = products?.reduce(
    (pre, curr) => pre + +curr.quantity,
    0
  );

  React.useEffect(() => {
    if (access) refresh();
  }, [access]);

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
          {totalProducts > 999 ? "99+" : totalProducts}
        </span>
      </span>
    </Link>
  );
};

export default CartPopover;
