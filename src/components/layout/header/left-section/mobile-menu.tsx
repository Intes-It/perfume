import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
 
const MobileMenu = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div {...props}>
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
             <FontAwesomeIcon icon={faBars} fontSize={'1.5rem'} />
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
