import * as React from "react";
import LeftSection from "./left_section";
import LogoSection from "./logo_section";
import RightSection from "./right_section";

const Header = () => {
  return (
    <div className="grid grid-cols-4 gap-4 h-28">
       <LeftSection/>
       <LogoSection className="col-span-2"/>
       <RightSection/>
    </div>
  );
};

export default Header;
