import Link from "next/link";
import * as React from "react";

const LeftSection = ({ ...rest }) => {
  return (
    <div {...rest}>
       <nav className="w-full bg-gray-800 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
           
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  `}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li className="text-white">
                  <Link href="/blogs">
                    <a>Blogs</a>
                  </Link>
                </li>
                <li className="text-white">
                  <Link href="/about">
                    <a>About US</a>
                  </Link>
                </li>
                <li className="text-white">
                  <Link href="/contact">
                    <a>Contact US</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSection;
