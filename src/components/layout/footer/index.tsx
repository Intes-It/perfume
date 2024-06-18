import { TwitterIcon, FacebookIcon, InstagramIcon } from "@components/icons";
import * as React from "react";
import { FooterRoutes } from "@definitions/constants";
import LogoSection from "../header/logo-section";
import { useAllCategory } from "@hooks/useCategory";
import useLocale from "@hooks/useLocale";
const Footer = () => {
  const { data } = useAllCategory();

  const OurUniverse = data?.[0]?.id ? data?.slice(0, 4) : null;

  const text = useLocale();
  return (
    <div className="h-fit bg-[#eff7cf]">
      <div className="grid grid-cols-1 lg:grid-cols-4 py-14">
        <div className="mx-auto mb-5">
          <LogoSection className="mx-auto h-32" />
          <div className="flex justify-center gap-4">
            <FacebookIcon className="h-5 w-5" />
            <TwitterIcon className="h-5 w-5" />
            <InstagramIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mx-10 grid col-span-3  md:grid-cols-3 lg:grid-cols-3">
          {FooterRoutes?.map((category) => (
            <div
              className="text-center md:text-left"
              key={category.categoryName}
            >
              <div className="mx-10 text-lg font-bold tracking-wide">
                {category?.categoryName}
              </div>
              <div className="grid">
                {category?.items?.map((item, index) => (
                  <a
                    className="mx-10 text-base font-light tracking-wide mt-2 
                  transition duration-500 hover:scale-110
                  border-b-2 border-transparent hover:border-white"
                    href={`/product-categories/${index + 1}`}
                    key={index}
                  >
                    {item?.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center md:text-left">
            <div className="mx-10 text-lg font-bold tracking-wide">
              {"Notre Univers"}
            </div>
            <div className="grid">
              {OurUniverse?.map((item: any, index: number) => (
                <a
                  className="mx-10 text-base font-light tracking-wide mt-2 
                  transition duration-500 hover:scale-110
                  border-b-2 border-transparent hover:border-white"
                  href={`/product-categories/${item.id}`}
                  key={index}
                >
                  {(item?.name as string)?.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-lg font-bold tracking-wide">
              {text.homePageScreen.notreLocal}
            </div>
            <div className="text-base font-Light tracking-wide mt-2">
              {text.homePageScreen.fairyNature} <br />
              {text.homePageScreen.adress}
              <br />
              {text.homePageScreen.time}
              <br />
              {text.homePageScreen.country}
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
