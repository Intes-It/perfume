import useLocale from "@hooks/useLocale";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Blog1 = () => {
  const text = useLocale();
  return (
    <div className="flex flex-col justify-between items-center xl:text-[24px] mobile:text-[21px] text-[22.5px] text-[#26222f]">
      <div className="relative">
        <h2 className="absolute z-0 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 w-[100%] text-center xl:text-[56px] text-[#fdf6f1] mobile:text-[32px] text-[40px] ">
          {text.blogScreen.lecomptoir}
        </h2>
        <img
          className="w-[100vw] h-[490px] mobile:h-[420px]"
          src={"/images/blog11.webp"}
          alt=""
        />
      </div>
      <div className="text-justify w-[95vw] mt-[60px] mobile:mt-[30px] mobile:w-[90vw] xl:w-[1180px] xl:mt-[100px] ">
        <h2>{text.blogScreen.text1}</h2>
      </div>
      <div className=" flex justify-between mobile:flex-col mobile:items-center text-justify xl:w-[1180px] xl:mt-[100px] mt-[60px] mobile:mt-[30px] w-[95vw]  ">
        <div className="w-[48%] mobile:w-[90vw]">
          <h2>{text.blogScreen.text2[0]}</h2>
          <h2>{text.blogScreen.text2[1]}</h2>
          <h2>{text.blogScreen.text2[3]}</h2>
        </div>
        <img
          className="w-[49%] tablet:h-[45%] mobile:w-[90vw] mobile:mt-2"
          src={"/images/blog12.webp"}
          alt=""
        />
      </div>
      <div className="text-justify w-[85vw] mt-[100px] mb-12 mobile:mt-[80px] lg:w-[967px] lg:mt-[180px]">
        <h3 className="my-4 text-[26px]  text-[#26222f]">
          {text.blogScreen.commentaire}
        </h3>
        <p className="my-4 text-[16px]  text-[#603813]">
          {text.blogScreen.votre}
        </p>
        <form className="flex flex-col space-y-5 ">
          <textarea
            placeholder={text.blogScreen.ecrivez}
            required
            id="id"
            className="px-4 py-2 h-[300px] border border-gray-300 text-[16px] bg-[#FAFAFA]"
          />
          <div className="flex justify-between mobile:flex-col mobile:space-y-3 py-4 text-[16px]">
            <input
              required
              type="text"
              placeholder={text.blogScreen.nom}
              className="w-[30%] mobile:w-[100%] h-15 px-4 py-3 border border-gray-300 bg-[#FAFAFA]"
            />
            <input
              required
              type="email"
              placeholder={text.blogScreen.email}
              className="w-[30%] mobile:w-[100%] px-4 py-3 border border-gray-300 bg-[#FAFAFA]"
            />
            <input
              type="site"
              placeholder={text.blogScreen.Site}
              className="w-[30%] mobile:w-[100%] px-4 py-3 border border-gray-300 bg-[#FAFAFA]"
            />
          </div>
          <div className="flex items-center mobile:items-start space-x-2">
            <input type="checkbox" id="remember" className="w-4 h-4 " />
            <p className="text-[16px] text-[#603813]">
              {text.blogScreen.enregistrer}
            </p>
          </div>
          <ReCAPTCHA
            sitekey="6LfAUlsmAAAAAJhiDuM15XtkE1VUnAOOchhh9UGb"
            // onChange={onChange}
          />
          <div>
            <button
              type="submit"
              className="w-[250px] px-4 py-4 text-[12.5px] uppercase font-semibold text-[#262238]  bg-[#ACD051] rounded-md shadow hover:bg-black hover:text-white"
            >
              {text.blogScreen.publier}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Blog1;
