import * as React from "react";
import SearchPopover from "../seach-popover";
import MobileMenu from "./mobile-menu";
import { useRouter } from "next/router";
import Link from "next/link";
import Language from "@components/layout/header/left-section/language";
// import { useLocale } from "@hooks/useLocale";
import { useTranslation } from "react-i18next";
import { translations } from '@utils/i18n';

const LeftSection = () => {
  const router = useRouter();


  return (
    <div className="grid gap-4 mt-5 ">
      <div className="flex mr-auto ml-2">
        <div className="hidden md:block">
          <nav className="flex ml-6 space-x-4">
            {/* <a href="/blog" className=" border-b-2 px-3 py-2 text-gray-500  "> */}
            <Link href="/blog">
              <a
                className={
                  router.pathname === "/blog"
                    ? " border-b-2 px-3 py-2 text-black-500"
                    : "px-3 py-2 text-black-500"
                }
              >
                Journal
              </a>
            </Link>
            <Link href="/faqs">
              <a
                className={
                  router.pathname === "/faqs"
                    ? " border-b-2 px-3 py-2 text-black-500"
                    : "px-3 py-2 text-black-500"
                }
              >
                FAQ
              </a>
            </Link>
            <Language/>
         
          </nav>
        </div>
        <MobileMenu className="mr-6 " />
        <SearchPopover className="md:hidden " />
      </div>
    </div>
  );
};

export default LeftSection;
