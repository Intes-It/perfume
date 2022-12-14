import * as React from "react";
import Account from "./account";
import CartPopover from "./cart-popover";
import SearchPopover from "../seach-popover";
import Favourite from "./favourite";
const RightSection = () => {
  return (
    <div className="grid gap-4 content-center">
      <div className="flex  mr-6 ml-auto">
        <SearchPopover className="hidden md:block mx-4" />
        <div className="mx-4">
          <Account />
        </div>
        <div className="mx-4">
          <Favourite />
        </div>
        <div className="mx-4">
          <CartPopover />
        </div>
      </div>
    </div>
  );
};

export default RightSection;
