import React, { useEffect, useState } from "react";
import { Container } from "@components";
import NextLink from "next/link";

import { BestSales } from "@components/best-sales";
import { OurUniverse } from "@definitions/constants";
import {
  BriefTextCreatrice,
  BriefTextNature,
  featuredComments,
} from "src/utils/fakeData";
import { FeaturedComments } from "@components/featured-comment";
import { useBestSallingProducts } from "@hooks/useProduct";
import { Carousel } from "flowbite-react";
import Link from "next/link";
const Home: React.FC = () => {
  const [text, setText] = useState(BriefTextCreatrice);

  const { products } = useBestSallingProducts();
  const homeSlideInfo = [
    {
      url: "https://naturefeerique.fr/wp-content/uploads/2022/03/slide1-1-scaled-1.jpg",
      caption: "",
      text: (
        <div
          className="absolute z-0 top-3/4   -translate-y-2/4 -translate-x-2/4 w-[100%] text-center"
          style={{ left: "85%" }}
        >
          <button
            style={{ padding: "10px 50px 10px 50px" }}
            className={
              "rounded-full h-12  text-center bg-[#ACD051] min-w-[140px] text-white border-transparent border hover:bg-transparent hover:text-black font-bold hover:border-black "
            }
          >
            <Link href={"https://nature-feerique.sumupstore.com"}>J'ADORE</Link>
          </button>
        </div>
      ),
    },
    {
      url: "https://naturefeerique.fr/wp-content/uploads/2022/03/s3-1.png",
      text: (
        <div
          className="absolute z-0 top-3/4   -translate-y-2/4 -translate-x-2/4 w-[100%] text-center"
          style={{ left: "85%" }}
        >
          <button
            className={
              "rounded-full h-12  text-center bg-black min-w-[140px] text-white border-transparent border hover:bg-transparent hover:text-black font-bold hover:border-black "
            }
          >
            <Link href={"https://nature-feerique.sumupstore.com"}>
              Je Succombe
            </Link>
          </button>
        </div>
      ),
    },
    {
      url: "https://naturefeerique.fr/wp-content/uploads/2022/03/mainof.jpg",
      text: (
        <div
          className="absolute z-0 top-2/3  -translate-y-2/4 -translate-x-2/4 w-[100%] text-center"
          style={{ left: "58%" }}
        >
          <button
            className={
              "rounded-full h-12  text-center bg-amber-950 min-w-[140px] text-white border-transparent border hover:bg-transparent hover:text-white font-bold hover:border-white "
            }
          >
            <Link href={"https://nature-feerique.sumupstore.com"}>OUI</Link>
          </button>
        </div>
      ),
    },
  ];
  return (
    <Container>
      <div className="right-0 bottom-0 left-0 z-[2] flex list-none justify-center p-0">
        <Carousel>
          {homeSlideInfo?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
              >
                <img
                  src={item?.url}
                  className="block w-full object-cover md:h-[40vw] h-[60rem]"
                  alt="..."
                />
                {item?.text}
              </div>
            );
          })}
        </Carousel>
      </div>

      <div className="my-16 md:min-h-[15vw] min-h-[12rem] w-full grid content-center bg-[#cec2b9]">
        <span className="text-center md:text-[36px] text-[24px] m-2 text-white font-bold">
          CHOISISSEZ DES PRODUITS NATURELS QUI FAVORISENT VOTRE BIEN-ÊTRE ET
          VOUS FONT VOUS SENTIR BIEN
        </span>
      </div>

      {/* best sales */}
      <div>
        <div className="w-full grid">
          <span className="text-center text-[32px] font-semibold tracking-wide text-[#383e42] mb-5">
            NOS MEILLEURES VENTES
          </span>
        </div>
        <BestSales products={products} showButton={true} />
      </div>

      {/* Our Universe */}
      <div>
        <div className="w-full grid my-10">
          <span className="text-center text-[32px] font-semibold tracking-wide text-[#383e42]">
            AU CŒUR DE NOTRE UNIVERS
          </span>
        </div>
        <div className="grid grid-cols-2 gap-5 text-center">
          {OurUniverse?.map((item: any, index: number) => {
            return (
              <div className="relative" key={index}>
                <img
                  className="h-[31vw] block w-full object-cover"
                  src={item?.image}
                  alt={item?.title}
                />
                <div className="absolute top-0 left-0 bg-black opacity-30 w-full h-full" />
                <div className="absolute z-0 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 w-[100%] text-center">
                  <div className="md:my-20 my-1">
                    <span className="text-xl md:text-[38.8px] text-white">
                      {(item?.title as string)?.toUpperCase()}
                    </span>
                  </div>
                  <NextLink href={item?.route} key={item?.title} passHref>
                    <button className="rounded-md px-5 py-2 hover:bg-white text-lg  border-white border bg-transparent hover:text-black text-white">
                      EXPLORER
                    </button>
                  </NextLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* about*/}
      <div className="flex flex-col justify-between items-center text-[19.2px] text-[#383E42] mobile:text-[16px]">
        <div className="flex flex-row mobile:flex-col justify-between text-justify bg-[#F9F4EE] lg:mt-[100px] mt-[50px]">
          <div className="animate-wiggle mobile:w-[100vw] w-1/2">
            <img src={"/images/about-nature.webp"} alt="" />
          </div>
          <div className="mobile:mx-5 mx-10 mobile:w-[100vw] w-1/2">
            <div className="text-center text-[44.8px] mobile:text-[25.6px] font-bold text-[#383E42]">
              <h2>A propos de </h2>
              <h2> Nature Féerique</h2>
            </div>
            <div>
              {BriefTextNature?.map((nature, index) => (
                <h2 key={index}>{nature}</h2>
              ))}
            </div>
            <div className="text-center my-2">
              <a href="/about/#apropos">
                <button className="mt-8 rounded-md bg-[#603813] hover:bg-[#383e42] text-white font-thin p-2 mobile:text-[2vw]">
                  En Savoir Plus
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row mobile:flex-col-reverse justify-between text-justify bg-[#F7F7F7]  mobile:mt-4">
          <div className="mobile:mx-5 mx-10 mobile:w-[100vw] w-1/2">
            <div className="text-center text-[44.8px] mobile:text-[25.6px] font-bold text-[#383E42]">
              <h2>Rencontre</h2>
              <h2>Avec la créatrice</h2>
            </div>
            <div>
              <h2>{text}</h2>
            </div>
            <div className="mt-8 text-center my-2">
              <a href="/about/#RALC">
                <button className="rounded-md hover:bg-[#603813] bg-[#383e42] text-white font-thin p-2 mobile:text-[2vw]">
                  En Savoir Plus
                </button>
              </a>
            </div>
          </div>
          <div className="animate-wiggle mobile:w-[100vw] w-1/2">
            <img src={"/images/about-creatrice.webp"} alt="" />
          </div>
        </div>
      </div>

      <div className="px-10">
        <div className="w-full grid my-12">
          <span className="text-center text-[32px] font-semibold tracking-wide text-[#383e42]">
            L’ART DE VOUS SÉDUIRE
          </span>
        </div>
        <FeaturedComments comments={featuredComments} />
      </div>
    </Container>
  );
};

export default Home;
