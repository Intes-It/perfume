import * as React from "react";
import LeftSection from "./left-section";
import LogoSection from "./logo-section";
import RightSection from "./right-section";

const Header = () => {
  return (
    <div className="grid grid-cols-4 gap-4 h-28">
      <LeftSection />
      <div className="col-span-2">
        <LogoSection className='mx-auto h-28'/>
      </div>
      <RightSection />
    </div>
  );
};

export default Header;
