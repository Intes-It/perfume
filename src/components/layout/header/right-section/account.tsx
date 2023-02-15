import NextLink from "next/link";
import * as React from "react";
import { Routes } from "@definitions/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import SvgUserIcon from "@components/icons/UserIcon";
const Account = () => {
  return (
    <div>
      <NextLink href={Routes.myAccount.route}>
        <a>
          <SvgUserIcon/>
        </a>
      </NextLink>
    </div>
  );
};

export default Account;
