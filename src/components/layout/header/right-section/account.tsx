import NextLink from "next/link";
import * as React from "react";
import { Routes } from "@definitions/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Account = () => {
  return (
    <div>
      <NextLink href={Routes.myAccount.route}>
        <a>
          <FontAwesomeIcon icon={faUser} fontSize={"1.5rem"} />
        </a>
      </NextLink>
    </div>
  );
};

export default Account;
