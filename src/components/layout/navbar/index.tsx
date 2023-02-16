import React from "react";
import NextLink from "next/link";
import { NavbarItems } from "@definitions/constants";

function Navbar() {
  return (
    <div className="bg-white sticky top-0 p-1 z-40  hidden md:block">
      <nav className=" w-full z-10">
        <div className="w-full">
          <div className="flex items-center w-full">
            <div className="block items-center  justify-between w-full">
              <div className="mx-auto">
                <nav className="flex justify-center -mb-px text-xs text-gray-500 font-bold mb-6">
                  {NavbarItems?.map((item: any, pIndex: number) => (
                    <div
                      key={pIndex}
                      className="group p-5 px-7 py-3 text-base font-light no-underline border-b-2 border-transparent hover:border-black transition hover:duration-75 hover:ease-in-out "
                    >
                      <div>
                        <NextLink href={item?.route} key={item?.title} passHref>
                          <a className={"text-sm"}>
                            {item?.title?.toUpperCase()}
                          </a>
                        </NextLink>
                        <div className="grid grid-flow-col w-full left-0 mt-[0.85rem] overflow-hidden bg-[#603813] absolute invisible  group-hover:animate-bottomToTop group-hover:visible">
                          {item?.children
                            ? Object.values(item?.children)?.map(
                                (subItem: any, index: number) => (
                                  <div
                                    key={index}
                                    className="m-3 text-white font-[600] tracking-wide "
                                  >
                                    <div
                                      className="transition duration-500
                                          border-b-2 border-transparent hover:border-white"
                                    >
                                      <a href={subItem?.route}>
                                        {subItem?.title?.toUpperCase()}
                                      </a>
                                    </div>
                                    <div className="text-base font-extralight tracking-wide">
                                      {subItem?.children
                                        ? Object.values(subItem?.children)?.map(
                                            (sSubItem: any, sIndex: number) => (
                                              <div
                                                key={sIndex}
                                                className="my-1 transition duration-500
                                                    border-b-2 border-transparent hover:border-white"
                                              >
                                                <a href={sSubItem?.route}>
                                                  {sSubItem?.title}
                                                </a>
                                              </div>
                                            )
                                          )
                                        : null}
                                    </div>
                                  </div>
                                )
                              )
                            : null}
                        </div>
                      </div>
                    </div>
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
