import React from "react";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Routes } from "@definitions/constants";
const Favourite = () => {
  return (
    <React.Fragment>
      <NextLink href={Routes.favorite.route}>
        <a>
          <FontAwesomeIcon icon={faHeart} fontSize={"1.5rem"} />
        </a>
      </NextLink>
    </React.Fragment>
  );
};

export default Favourite;
