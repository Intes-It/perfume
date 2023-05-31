import React from "react";
import NextLink from "next/link";
import { Routes } from "@definitions/constants";
import { useAllCategory } from "@hooks/useCategory";
import CartPopover from "../header/right-section/cart-popover";

function Navbar() {
  const { categories, subCategories, subsubCategories } = useAllCategory();
  // const {subCategories} =  useSubCategory();

  // console.log('subcategory:%o', subCategories)
  const exCategories = categories && [
    Routes.home,
    Routes.about,
    ...categories,
    Routes.contact,
  ];
  console.log("s", subCategories);
  return (
    <div className="bg-white sticky top-0 p-1 z-40  hidden md:block">
      <nav className=" w-full z-10">
        <div className="w-full">
          <div className="flex items-center w-full">
            <div className="block items-center  justify-between w-full">
              <div className="mx-auto">
                <nav>
                  <ul className="flex justify-center mb-2 text-[2px] text-gray-700 tracking-wider">
                    {exCategories?.map((item: any, pIndex: number) => (
                      <li
                        key={pIndex}
                        className="group p-5 px-7 py-3 text-base font-light border-b-2 border-transparent hover:border-black transition hover:duration-75 hover:ease-in-out"
                      >
                        <div>
                          {/* categories */}
                          {item?.slug && (
                            <NextLink
                              href={`/product-categories/${item?.slug}`}
                              key={item?.name}
                              passHref
                            >
                              <a className={"text-sm"}>
                                {item?.name?.toUpperCase()}
                              </a>
                            </NextLink>
                          )}
                          {item?.route && (
                            <NextLink
                              href={item?.route}
                              key={item?.title}
                              passHref
                            >
                              <a className={"text-sm"}>
                                {item?.title?.toUpperCase()}
                              </a>
                            </NextLink>
                          )}
                          {/* subcategories */}
                          <div className="grid grid-flow-col w-full left-0 mt-[0.85rem] overflow-hidden bg-[#603813] absolute invisible  group-hover:animate-bottomToTop group-hover:visible">
                            {subCategories?.map(
                              (subCategory: any, sindex: number) =>
                                subCategory?.category === item?.id && (
                                  <div
                                    key={sindex}
                                    className="m-3 text-white font-[600] tracking-wide mx-auto"
                                  >
                                    <div
                                      className="transition duration-500
                                          border-b-2 border-transparent hover:border-white"
                                    >
                                      <a
                                        href={`/product-categories/${item?.slug}/${subCategory?.slug}`}
                                      >
                                        {subCategory?.name?.toUpperCase()}
                                      </a>
                                    </div>
                                    <div className="text-base font-extralight tracking-wide">
                                      {subsubCategories?.map(
                                        (
                                          subsubCategory: any,
                                          ssindex: number
                                        ) =>
                                          subsubCategory?.subcategory ===
                                            subCategory?.id && (
                                            <div
                                              key={ssindex}
                                              className="my-1 transition duration-500
                                              border-b-2 border-transparent hover:border-white"
                                            >
                                              <a
                                                href={`/product-categories/${item?.slug}/${subCategory?.slug}/${subsubCategory?.slug}`}
                                              >
                                                {subsubCategory?.name}
                                              </a>
                                              <br />
                                            </div>
                                          )
                                      )}
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
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
