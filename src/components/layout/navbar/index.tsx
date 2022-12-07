import React, { useState } from "react";
import NextLink from "next/link";
import { Transition } from "@headlessui/react";
import { Link } from "react-scroll";
import Image from "next/image";
import Logo from "../public/streamlineLogo.png";
import { NavbarItems } from "@definitions/constants";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white sticky top-0">
      <nav className=" w-full z-10">
        <div className="w-full">
          <div className="flex items-center p-1 w-full">
            <div className="flex items-center  justify-between w-full">
              <div className="hidden md:block mx-auto">
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

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
              >
                <Link
                  href="/home"
                  activeClass="home"
                  to="home"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  activeClass="about"
                  to="about"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  About
                </Link>

                <Link
                  href="/work"
                  activeClass="work"
                  to="work"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Projects
                </Link>
                <Link
                  href="/services"
                  activeClass="services"
                  to="services"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Services
                </Link>

                <Link
                  href="/contact"
                  activeClass="work"
                  to="work"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
