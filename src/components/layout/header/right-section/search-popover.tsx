import { GithubIcon, SearchIcon } from "@components/icons";
import NextLink from "next/link";
import * as React from "react";

const SearchPopover = () => {
  return (
    <div>
      <NextLink href="#">
        <a>
          <SearchIcon className="h-8 w-8" />
        </a>
      </NextLink>
    </div>
  );
};

export default SearchPopover;
