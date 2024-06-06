import SearchPopover from "../seach-popover";
import Account from "./account";
import CartPopover from "./cart-popover";
import Favourite from "./favourite";
const RightSection = () => {
  return (
    <div className="grid content-center h-16 gap-2 md:gap-4">
      <div className="flex ml-auto md:mr-20 gap-x-5">
        <SearchPopover className="hidden fixed md:block mx-4 z-[500] right-[180px]" />
        <div className="md:mx-4 mr-16 z-[500] fixed right-[70px] mt-1.5">
          <Account />
        </div>
        <div className="md:mx-4 mx-2 fixed hidden right-[120px] md:block z-[500] cursor-pointer mt-1.5">
          <Favourite />
        </div>
        <div className="md:mx-4 mx-2 fixed right-3 z-[500] cursor-pointer mt-1.5">
          <CartPopover />
        </div>
      </div>
    </div>
  );
};

export default RightSection;
