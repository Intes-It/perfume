import NextLink from "next/link";
import * as React from "react";
import { Fragment, useState } from "react";
import {
  faX,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cartProps } from "@types";

interface ICart {
  item?: cartProps;
}
const CartPopover: React.FC<ICart> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
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
                0
              </span>
            </span>
          </a>
        </NextLink>
        {showModal && (
          <div
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
            className="fixed right-[15px] top-[55px] z-50"
          >
            <div className="mt-8 w-[330px] h-[200px] m-2 border shadow-md rounded-md bg-white p-4 py-5">
              <FontAwesomeIcon
                icon={faX}
                fontSize={"1.5rem"}
                style={{ color: "#ccc" }}
                onClick={() => setShowModal(false)}
                className={"float-right"}
              />
              <br />
              <div>{item ? <>item</> : <>No products in the cart</>}</div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CartPopover;
