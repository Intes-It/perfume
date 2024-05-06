import * as React from "react";
import Account from "./account";
import CartPopover from "./cart-popover";
import SearchPopover from "../seach-popover";
import Favourite from "./favourite";
const RightSection = () => {
  return (
    <div className="grid md:gap-4 gap-2 content-center h-16">
      <div className="flex md:mr-20 gap-x-5 ml-auto">
        <SearchPopover className="hidden fixed md:block mx-4 z-[500] right-36" />
        <div className="md:mx-4 mr-16 z-[500] fixed right-14">
          <Account />
        </div>
        <div className="md:mx-4 mx-2 fixed hidden right-24 md:block z-[500]">
          <Favourite />
        </div>
        <div className="md:mx-4 mx-2 fixed right-3 z-[500]">
          <CartPopover />
        </div>
      </div>
    </div>
  );
};

export default RightSection;
