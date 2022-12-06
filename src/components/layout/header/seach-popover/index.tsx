import NextLink from "next/link";
import * as React from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { GithubIcon, SearchIcon } from "@components/icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchPopover = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div {...props}>
      <NextLink href="#">
        <a>
          <FontAwesomeIcon icon={faSearch} fontSize={'1.5rem'} />
        </a>
      </NextLink>
    </div>
  );
};

export default SearchPopover;
