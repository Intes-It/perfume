import React from "react";
import NextLink from "next/link";
import { NavbarItems } from "@definitions/constants";

function Navbar() {
  return (
    <div className="bg-white hidden md:block  sticky top-0 z-50">
      <nav className=" w-full z-10">
        <div className="w-full">
          <div className="flex items-center p-1 w-full">
            <div className="flex items-center  justify-between w-full">
              <div className="mx-auto">
                <nav className="flex justify-center -mb-px text-xs text-gray-500 font-bold">
                  {NavbarItems?.map((item) => (
                    <NextLink href={item?.route} key={item?.title} passHref>
                      <a className="p-5 py-3 text-base font-light no-underline border-b-2 border-transparent hover:border-black ">
                        {item?.title?.toUpperCase()}
                      </a>
                    </NextLink>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
