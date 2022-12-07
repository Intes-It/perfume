import { Container } from "@components/container";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const MyAccount = () => {
  return (
    <Container>
      <div className="flex justify-around items-center flex-col mt-10 md:flex-row md:items-start">
        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">Connexion</h3>
          <form
            action="#"
            className="flex flex-col space-y-5 border rounded-md p-6"
          >
            <div className="flex flex-col space-y-1">
              <label className="text-[14.4px] font-semibold text-[#603813] ">
                Identifiant ou e-mail{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="id"
                id="id"
                className="px-4 py-2 border border-gray-300"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[14.4px] font-semibold text-[#603813]">
                  Mot de passe{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
              </div>
              <input
                required
                type="password"
                id="password"
                className="px-4 py-2 border border-gray-300"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="w-4 h-4 " />
                <label className="text-[14.4px] font-semibold text-[#603813]">
                  Se souvenir de moi
                </label>
              </div>
              <a
                href="#"
                className="text-sm  text-blue-600 hover:underline focus:text-blue-800"
              >
                Mot de passe perdu ?
              </a>
            </div>
            <ReCAPTCHA
              sitekey="6Lc2xVYjAAAAAIuk6-oEbePPkK0caIt1JrnPIOOp"
              // onChange={onChange}
            />
            <div>
              <button
                type="submit"
                className="w-[200px] px-4 py-3 text-[16px] uppercase font-semibold text-white  bg-[#603813] rounded-md shadow hover:bg-black"
              >
                Identification
              </button>
            </div>
          </form>
        </div>

        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">S’enregistrer</h3>
          <form
            action="#"
            className="flex flex-col space-y-5 border rounded-md p-6"
          >
            <div className="flex flex-col space-y-1">
              <label className="text-[14.4px] font-semibold text-[#603813] ">
                Identifiant <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="id"
                id="id"
                className="px-4 py-2 border border-gray-300"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-[14.4px] font-semibold text-[#603813] ">
                E-mail <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="email"
                id="email"
                className="px-4 py-2 border border-gray-300"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[14.4px] font-semibold text-[#603813]">
                  Mot de passe{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
              </div>
              <input
                required
                type="password"
                id="password"
                className="px-4 py-2 border border-gray-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4 " />
              <label className="text-[14.4px] font-semibold text-[#603813]">
                Subscribe to our newsletter
              </label>
            </div>
            <ReCAPTCHA
              sitekey="6Lc2xVYjAAAAAIuk6-oEbePPkK0caIt1JrnPIOOp"
              // onChange={onChange}
            />
            <p className="text-[16px] text-[#603813]">
              Vos données personnelles seront utilisées pour vous accompagner au
              cours de votre visite du site web, gérer l’accès à votre compte,
              et pour d’autres raisons décrites dans notre politique de
              confidentialité.
            </p>
            <div>
              <button
                type="submit"
                className="w-[200px] px-4 py-3 text-[16px] uppercase font-semibold text-white  bg-[#603813] rounded-md shadow hover:bg-black"
              >
                S’enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default MyAccount;
