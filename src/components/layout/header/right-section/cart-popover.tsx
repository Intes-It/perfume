import NextLink from "next/link";
import * as React from "react";
import { Fragment, useState } from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartPopover = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <div>
        <NextLink href="#">
          <a>
            <FontAwesomeIcon
              className="hover:opacity-[0.5]"
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
              icon={faCartShopping}
              fontSize={"1.5rem"}
            />
          </a>
        </NextLink>
        {showModal && (
          <div
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
            className="fixed right-[15px] top-[55px] z-50"
          >
            <div className="mt-8 w-[330px] h-[200px] m-2 border shadow-md rounded-md bg-white">
              No products in the cart
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CartPopover;
