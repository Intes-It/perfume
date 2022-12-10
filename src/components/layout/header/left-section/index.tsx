import * as React from "react";
import SearchPopover from "../seach-popover";
import MobileMenu from "./mobile-menu";

const LeftSection = () => {
  return (
    <div className="grid gap-4 content-center">
      <div className="flex mr-auto ml-2">
        <div className="hidden md:block">
          <nav className="flex ml-6 space-x-4">
            <a href="/blog" className="px-3 py-2 text-gray-500 hover:underline">
              Journal
            </a>
            <a href="/faqs" className="px-3 py-2 text-gray-500 hover:underline">
              FAQ
            </a>
          </nav>
        </div>
        <MobileMenu className="mr-6" />
        <SearchPopover className="md:hidden" />
      </div>
    </div>
  );
};

export default LeftSection;
