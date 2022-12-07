import NextLink from "next/link";
import * as React from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartPopover = () => {
  return (
    <div>
      <NextLink href="#">
        <a>
          <FontAwesomeIcon icon={faCartShopping} fontSize={"1.5rem"} />
        </a>
      </NextLink>
    </div>
  );
};

export default CartPopover;
