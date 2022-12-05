import { UserIcon } from "@components/icons";
import NextLink from "next/link";
import * as React from "react";
import { Routes } from "@definitions/constants";

const Account = () => {
  return (
    <div>
      <NextLink href={Routes.myAccount.route}>
        <a>
          <UserIcon className="h-8 w-8" />
        </a>
      </NextLink>
    </div>
  );
};

export default Account;
