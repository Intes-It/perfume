import { GithubIcon, TwitterIcon, YoutubeIcon } from "@components/icons";
import * as React from "react";
import LogoSection from "../header/logo_section";

const Footer = () => {
  return (
    <div className="h-fit bg-[#eff7cf]">
      <div className="grid grid-cols-4 gap-4 py-24">
        <div className="mx-auto">
          <LogoSection className="mx-auto h-32" />
          <div className="flex justify-center gap-4">
            <GithubIcon className="h-5 w-5" />
            <TwitterIcon className="h-5 w-5" />
            <YoutubeIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="ml-20">
          <div className="text-lg font-bold tracking-wide">Information</div>
          <div className="grid">
            <a className="text-base font-Light tracking-wide mt-2" href="#">A Propos</a>
            <a className="text-base font-Light tracking-wide mt-2" href="#">FAQ</a>
          </div>
        </div>
        <div>01</div>
        <div>09</div>
      </div>
    </div>
  );
};

export default Footer;
