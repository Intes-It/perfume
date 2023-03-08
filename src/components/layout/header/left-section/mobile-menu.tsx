import * as React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavbarItems } from "@definitions/constants";
import { useRouter } from "next/router";

const MobileMenu = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
                data-te-target="#sidenav-3"
              >X</button>
            </div>
            <ul
              className="relative m-0 list-none px-[0.2rem] text-white"
              data-te-sidenav-menu-ref>
              {NavbarItems?.map((item, index) => {
                const active = router.asPath === item?.route;
                return (
                  <li key={index} className="relative">
                    <a data-te-sidenav-link-ref
                      className={`dropdown-item text-base font-light tracking-wide py-3 px-6 block w-full whitespace-nowrap bg-transparent ${active ? 'bg-yellow-900' : ''} hover:bg-yellow-900`}
                      href={item?.route}
                    >
                      {item?.title?.toUpperCase()}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav> 
          <button
            className="inline-flex items-center justify-center rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2   focus:ring-white"
            data-te-sidenav-toggle-ref
            data-te-target="#sidenav-3"
            aria-controls="#sidenav-3"
            aria-haspopup="true">
            <FontAwesomeIcon icon={faBars} fontSize={"1.5rem"} />
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
