import * as React from "react";
import Account from "./account";
import CartPopover from "./cart-popover";
import SearchPopover from "../seach-popover";
import Favourite from "./favourite";
const RightSection = () => {
  return (
    <div className="grid md:gap-4 gap-2 content-center">
      <div className="flex md:mr-6 ml-auto">
        <SearchPopover className="hidden md:block mx-4" />
        <div className="md:mx-4 mx-2">
          <Account />
        </div>
        <div className="md:mx-4 mx-2 hidden md:block ">
          <Favourite />
        </div>
        <div className="md:mx-4 mx-2">
          <CartPopover />
        </div>
      </div>
    </div>
  );
};

export default RightSection;
