import { Container } from "@components/container";
import useLocale from "@hooks/useLocale";
import { TextCreatrice, TextNature } from "@utils/fakeData";
import * as React from "react";

const About = () => {
  const text = useLocale();

  return (
    <Container>
      <div className="flex flex-col justify-between items-center text-[20.8px] text-[#383E42] mobile:text-[16px] ">
        <div
          id="apropos"
          className=" flex flex-col lg:flex-row justify-between text-justify bg-[#F9F4EE] lg:mt-[100px] mt-[50px] w-[100vw] "
        >
          <div className="lg:w-[48%] lg:h-[32%] animate-wiggle">
            <img src={"/images/about-nature.webp"} alt="" />
          </div>
          <div className="lg:w-[48%] mobile:mx-5 mx-10">
            <div className="text-center text-[44.8px] mobile:text-[25.6px] font-bold text-[#383E42]">
              <h2>{text.homePageScreen.about}</h2>
              <h2> {text.homePageScreen.fairyNature}</h2>
            </div>
            <div>
              {TextNature?.map((nature, index) => (
                <h2 key={index}>{nature}</h2>
              ))}
            </div>
          </div>
        </div>
        <div
          id="RALC"
          className=" flex justify-between flex-col-reverse lg:flex-row text-justify bg-[#F7F7F7] lg:mt-[100px] mt-[50px] w-[100vw] "
        >
          <div className="lg:w-[48%] mobile:mx-5 mx-10">
            <div className="text-center text-[44.8px] mobile:text-[25.6px] font-bold text-[#383E42]">
              <h2>Encounter</h2>
              <h2> With the creator</h2>
            </div>
            <div>
              {TextCreatrice?.map((creatrice, index) => (
                <h2 key={index}>{creatrice}</h2>
              ))}
              <div className="flex justify-center my-10 mobile:my-5">
                <h3>EMILIE</h3>
                <img className="" src={"/images/about-mini-logo.webp"} alt="" />
              </div>
            </div>
          </div>
          <img
            className="lg:w-[48%] h-[40%]"
            src={"/images/about-creatrice.webp"}
            alt=""
          />
        </div>
      </div>
    </Container>
  );
};

export default About;
