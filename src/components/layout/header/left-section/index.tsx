import * as React from 'react';
import SearchPopover from '../seach-popover';
import MobileMenu from './mobile-menu';
import { useRouter } from 'next/router';

const LeftSection = () => {
  const router = useRouter();
  return (
    <div className="grid gap-4 content-center">
      <div className="flex mr-auto ml-2">
        <div className="hidden md:block">
          <nav className="flex ml-6 space-x-4">
            {/* <a href="/blog" className=" border-b-2 px-3 py-2 text-gray-500  "> */}
            <a
              href="/blog"
              className={
                router.pathname === '/blog'
                  ? ' border-b-2 px-3 py-2 text-black-500'
                  : 'px-3 py-2 text-black-500'
              }>
              Journal
            </a>
            <a
              href="/faqs"
              className={
                router.pathname === '/faqs'
                  ? ' border-b-2 px-3 py-2 text-black-500'
                  : 'px-3 py-2 text-black-500'
              }>
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
