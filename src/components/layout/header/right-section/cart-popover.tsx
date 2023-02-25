import NextLink from "next/link";
import * as React from "react";
import { Fragment, useState } from "react";
import { faX, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import { ExProduct } from "@types";

const CartPopover: React.FC = () => {
  const products = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];
 
  const totalProducts = products?.reduce((pre, curr) => pre + curr.quantity, 0);
  const totalMoney = products?.reduce((pre, curr) => pre + curr.quantity * Number.parseFloat(curr.product.price || '0'), 0);

  const [showModal, setShowModal] = useState(false);

  const server_link = process.env.NEXT_PUBLIC_API_URL;

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
            className="fixed right-[15px] top-[55px] z-50"
          >
            <div className="mt-8 w-[330px] max-h-[500px] m-2 border shadow-md rounded-md bg-white p-4 py-5">
              <FontAwesomeIcon
                icon={faX}
                fontSize={"1.5rem"}
                style={{ color: "#ccc" }}
                onClick={() => setShowModal(false)}
                className={"float-right"}
              />
              <br />
              {products ? (
                <div>
                  {products?.map((item) => (
                    <div className="grid grid-cols-4 border-b-[1px] p-4">
                      <img
                        src={`${server_link}${item?.product?.image}`}
                        alt={item?.product?.name}
                      />
                      <div className="col-span-3 ml-6 flex-row">
                        <div>{item?.product?.name}</div>
                        <div className="text-gray-400 font-bold">{`${item?.quantity} x ${item?.product?.price} €`}</div>
                      </div>
                    </div>
                  ))}
                  <div className="grid border-b-[1px] p-4">
                    <strong className="m-auto  text-[#603813] font-bold text-[20px]">
                      {`Sous-total: ${totalMoney} €`}
                    </strong>
                  </div>
                  <button className="bg-[#61CE70] w-full p-3 rounded-[5px] mt-5">
                    Commander
                  </button>
                </div>
              ) : (
                <div>No products in the cart</div>
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
