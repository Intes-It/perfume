import * as React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '@definitions/constants';
import { useAllCategory } from '@hooks/useCategory'; 

const MobileMenu = ({ ...props }) => {
  const [state, setState] = useState({ isShowMobileSidebar: false });
  const { categories, subCategories, subsubCategories } = useAllCategory();
  categories?.forEach((item: any) => {
    item.newName = item.name.replace(/\s/g, '');
  });
  subCategories?.forEach((item: any) => {
    item.newName = item.name.replace(/\s/g, '');
  });
  subsubCategories?.forEach((item: any) => {
    item.newName = item.name.replace(/\s/g, '');
  });


  const exCategories = categories && [Routes.home, Routes.about, ...categories, Routes.faq,Routes.blog,Routes.contact];
  
  const dropdown = React.useRef(null);

  const { isShowMobileSidebar } = state;

  return (
    <div>
      <div {...props}>
        <div className="flex md:hidden" onClick={()=>{
           if (dropdown.current) 
              setState((pre) => ({ ...pre, isShowMobileSidebar: false }))
        }}>
          <button
            className="inline-flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            data-te-target="#sidenav-3"
            aria-controls="#sidenav-3"
            aria-haspopup="true"
            onClick={() => {
              setState((pre) => ({ ...pre, isShowMobileSidebar: true }))
            }}>
            <FontAwesomeIcon icon={faBars} fontSize={'1.5rem'} />
          </button>

          {/* <!-- Sidenav -->  */}
          {isShowMobileSidebar && <div className="animate-crescendo fixed z-50 inset-0 bg-black bg-opacity-75 flex  items-center m-0">
            <div ref={dropdown}
              className=" fixed top-0 bottom-0 lg:left-0 p-2 w-[460px] bg-black bg-opacity-75  overflow-y-auto text-center "
            >
              <button
                className="btn-close btn-close-white box-content w-4 h-4 p-2 mr-0 float-right
                 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100
                 hover:text-red-600 hover:opacity-75 hover:no-underline"
                onClick={() => {
                  setState((pre) => ({ ...pre, isShowMobileSidebar: false }))
                }}>
                X
              </button>
              {exCategories?.map((item: any) => (
                <div>
                  <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#603813] text-white">
                    {/* <i className="bi bi-house-door-fill"></i> */}
                    <span className="text-[15px] ml-0 text-gray-200 font-bold">
                      <a href={item?.route || `/product-categories/${item?.slug}`}>
                        {item?.name || item?.title}
                      </a>
                    </span>
                  </div>
                  {subCategories?.map(
                    (subCategory: any) =>
                      subCategory?.category === item?.id && (
                        <div>
                          <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#603813] text-white">
                            {/* <i className="bi bi-house-door-fill"></i> */}
                            <span className="text-[13px] ml-4 text-gray-200">
                              <a href={`/product-categories/${item?.slug}/${subCategory?.slug}`}>
                                {subCategory?.name}
                              </a>
                            </span>
                          </div>
                          {subsubCategories?.map(
                            (subsubCategory: any) =>
                              subsubCategory?.subcategory === subCategory?.id && (
                                <div className="p-2.5 mt-1 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#603813] text-white">
                                  <span className="text-[12.5px] ml-7 text-gray-200">
                                    <a
                                      href={`/product-categories/${item?.slug}/${subCategory?.slug}/${subsubCategory?.slug}`}>
                                      {subsubCategory?.name}
                                    </a>
                                  </span>
                                </div>
                              ))}
                        </div>
                      ))}
                </div>
              ))}

            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
