import * as React from "react";
import Account from "./account";
import CartPopover from "./cart-popover";
import SearchPopover from "./search-popover";

const RightSection = () => {
  return (
    <div className="grid gap-4 content-center">
      <div className="flex ml-auto mr-6 space-x-4">
        <SearchPopover/>
        <Account/>
        <CartPopover/>
      </div>
    </div>
  );
};

export default RightSection;
