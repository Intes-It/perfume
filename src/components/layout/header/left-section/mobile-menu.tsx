import * as React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavbarItems, Routes } from '@definitions/constants';
import { useRouter } from 'next/router';
import { useAllCategory } from '@hooks/useCategory';
import NextLink from 'next/link';

const MobileMenu = ({ ...props }) => {
  const router = useRouter();
  const { categories, subCategories, subsubCategories } = useAllCategory();

  const exCategories = categories && [Routes.home, Routes.about, ...categories, Routes.contact];
  console.log('exCategories:%o ', exCategories);
  console.log('subCategories:%o ', subCategories);

  return (
    <div>
      <div {...props}>
        <div className="flex md:hidden">
          <nav
            id="sidenav-3"
            className="offcanvas fixed top-0 left-0 z-[1035] h-screen w-[1/4] -translate-x-full overflow-hidden  bg-[#000000bb] shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0"
            data-te-sidenav-init
            data-te-sidenav-hidden="true"
            data-te-sidenav-color="white">
            <div className="offcanvas-header flex items-center justify-between p-4">
              <button
                type="button"
                className="btn-close btn-close-white box-content w-4 h-4 p-2 ml-auto text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-red-600 hover:opacity-75 hover:no-underline"
                data-te-sidenav-toggle-ref
                data-te-target="#sidenav-3">
                X
              </button>
            </div>
            <ul className="relative m-0 list-none px-[0.2rem] text-white" data-te-sidenav-menu-ref>
              {exCategories?.map((item: any, index: number) => (
                <li key={index} className="relative">
                  {/*categories*/}
                  {item?.slug && (
                    <div key={index}>
                      <h2 className="mb-0" id={item?.slug}>
                        <button
                          className="group relative flex w-full items-center  py-4 px-5 text-left text-base text-[#8f8b88] transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-[#8f8b88] [&:not([data-te-collapse-collapsed])]:bg-transparent [&:not([data-te-collapse-collapsed])]:text-white [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800]"
                          type="button"
                          data-te-collapse-init
                          data-te-collapse-collapsed
                          data-te-target={'#' + item?.name}
                          aria-expanded="true"
                          aria-controls={item?.slug}>
                          {item?.name}
                          <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-6 w-6">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </span>
                        </button>
                      </h2>
                      {/*subCategories*/}
                      {subCategories?.map(
                        (subCategory: any, sIndex: number) =>
                          subCategory?.category === item?.id && (
                            <div
                              key={sIndex}
                              id={item?.name}
                              className="!visible hidden"
                              data-te-collapse-item
                              data-te-collapse-show
                              aria-labelledby={item?.slug}
                              data-te-parent="#accordionExample">
                              <div className="p-6 text-[10px]">
                                <a href={`/product-categories/${item?.slug}/${subCategory?.slug}`}>
                                  {subCategory?.name}
                                </a>

                                {/* <h2 className="mb-0" id={subCategory?.slug}>
                                  <button
                                    className="group relative flex w-full items-center  py-4 px-5 text-left text-base text-white transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-transparent [&:not([data-te-collapse-collapsed])]:text-white [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                    type="button"
                                    data-te-collapse-init
                                    data-te-target={'#' + subCategory?.name}
                                    aria-expanded="true"
                                    aria-controls={subCategory?.slug}>
                                    {subCategory?.name}
                                    <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                      </svg>
                                    </span>
                                  </button>
                                </h2> */}
                                {/*subsubCategories*/}
                                {/* {subsubCategories?.map(
                                  (subsubCategory: any, ssindex: number) =>
                                    subsubCategories?.subcategory === subCategory?.id && (
                                      <div
                                        key={ssindex}
                                        id={subCategory?.name}
                                        className="!visible"
                                        data-te-collapse-item
                                        data-te-collapse-show
                                        aria-labelledby={subCategory?.slug}
                                        data-te-parent="#accordionExample">
                                        {subsubCategory?.name}
                                      </div>
                                    )
                                )} */}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  )}
                  {item?.route && (
                    <NextLink href={item?.route} key={item?.title} passHref>
                      <a
                        data-te-sidenav-link-ref
                        className={`dropdown-item text-base text-[#8f8b88] font-light tracking-wide py-3 px-6 block w-full whitespace-nowrap bg-transparent 
                       hover:bg-yellow-900`}>
                        {item?.title?.toUpperCase()}
                      </a>
                    </NextLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="inline-flex items-center justify-center rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2   focus:ring-white"
            data-te-sidenav-toggle-ref
            data-te-target="#sidenav-3"
            aria-controls="#sidenav-3"
            aria-haspopup="true">
            <FontAwesomeIcon icon={faBars} fontSize={'1.5rem'} />
          </button>
        </div>
        {/* <!-- Sidenav --> 

        {/* <!-- Toggler --> */}

        {/* <div className="flex md:hidden">
           
          <div className="flex space-x-2">
            <div>
              <div
                className="offcanvas offcanvas-start fixed bottom-0 flex flex-col max-w-full bg-[#000000bb] invisible bg-clip-padding shadow-sm outline-none transition duration-1000 ease-in-out text-white top-0 left-0 border-none w-96"
                tabIndex={-1}
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div className="offcanvas-header flex items-center justify-between p-4">
                  <button
                    type="button"
                    className="btn-close btn-close-white box-content w-4 h-4 p-2 ml-auto text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-red-600 hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body flex-grow overflow-y-auto mt-6">
                  <ul className="text-base z-50  py-2 list-none text-left rounded-lg mt-1 m-0 bg-clip-padding border-none">
                    {NavbarItems?.map((item, index) => {
                      const active = router.asPath === item?.route;
                      return (
                        <li key={index}>
                          <a
                            className={`dropdown-item text-base font-light tracking-wide py-3 px-6 block w-full whitespace-nowrap bg-transparent ${active ? 'bg-yellow-900':''} hover:bg-yellow-900`}
                            href={item?.route}
                          >
                            {item?.title?.toUpperCase()}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MobileMenu;
