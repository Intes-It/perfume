import NextLink from "next/link";
import * as React from "react";
import { Fragment, useState } from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchModal from "./search-modal";

const SearchPopover = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const [showModal, setShowModal] = useState(false);
  
   
  return (
    <Fragment>
      <div {...props}>
        <NextLink  href="#"
         >
          <a>
            <FontAwesomeIcon onClick={() => setShowModal(true)} icon={faSearch} fontSize={'1.5rem'} />
          </a>
        </NextLink>
        </div>
         <SearchModal isVisible={showModal} onClose={() => setShowModal(false)}/>
    </Fragment>
    
  );
};

export default SearchPopover;
