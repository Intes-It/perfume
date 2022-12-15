import * as React from "react";
import { useState } from "react";

const DropdownCheckbox = () => {
    const [isList, setIsList] = useState(false);
  return (
    <div className="font-semibold">
        <div
          onClick={() => setIsList(!isList)}
          className="w-56 p-4 border rounded bg-white text-[#603813] text-[14.4px] leading-none flex items-center justify-between cursor-pointer"
        >
          Catégories
          <div>
            {isList ? (
              <div>
                <svg
                  width={10}
                  height={6}
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.00016 0.666664L9.66683 5.33333L0.333496 5.33333L5.00016 0.666664Z"
                    fill="#1F2937"
                  />
                </svg>
              </div>
            ) : (
              <div>
                <svg
                  width={10}
                  height={6}
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.00016 5.33333L0.333496 0.666664H9.66683L5.00016 5.33333Z"
                    fill="#1F2937"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        {isList && (
          <div className="w-56 mt-2 p-4 space-y-4 bg-white border rounded text-[#603813] text-[16px] ">
            <div className="flex space-x-2 cursor-pointer">
              <input type="checkbox" id="remember" className="w-4 h-4 " />
              <p className="">
              Baume Solide
              </p>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <input type="checkbox" id="remember" className="w-4 h-4 " />
              <p className="">
              Baume Solide
              </p>
            </div>
          </div>
        )}
      </div>
  );
};

export default DropdownCheckbox;