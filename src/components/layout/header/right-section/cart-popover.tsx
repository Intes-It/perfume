import { CartIcon } from "@components/icons";
import NextLink from "next/link";
import * as React from "react";

const CartPopover = () => {
  return (
    <div>
      <NextLink href='#'>
        <a>
          <CartIcon className="h-8 w-8" />
        </a>
      </NextLink>
    </div>
  );
};

export default CartPopover;
