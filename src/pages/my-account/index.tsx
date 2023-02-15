import { Container } from "@components/container";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { Routes } from "@definitions/constants";
const MyAccount = () => {
  const [check,setCheck]=React.useState<boolean>(true)
  return (
    <Container>
      <div className="flex justify-around items-center flex-col mt-10 md:flex-row md:items-start">
        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">Connexion</h3>
          <form
            action="#"
            className="flex flex-col space-y-5 border rounded-md p-6 text-[14.4px] font-semibold text-[#603813]"
          >
            <div className="flex flex-col space-y-1">
              <label>
                Identifiant ou e-mail{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="id"
                id="id"
                className="px-4 py-3 border border-gray-300 text-black"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>
                Mot de passe{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="password"
                id="password"
                className="px-4 py-3 border border-gray-300 text-black"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 "
                />
                <label>Se souvenir de moi</label>
              </div>
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
            <Link href={Routes.myAccount.children.forgotPassword.route}>
              <a className="text-base  text-brow-300">Mot de passe perdu ?</a>
            </Link>
          </form>
        </div>

        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">S’enregistrer</h3>
          <form
            action="#"
            className="flex flex-col space-y-5 border rounded-md p-6 text-[14.4px] font-semibold text-[#603813] "
          >
            <div className="flex flex-col space-y-1">
              <label>
                Identifiant <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="id"
                id="id"
                className="px-4 py-3 border border-gray-300 text-black"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>
                E-mail <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="email"
                id="email"
                className="px-4 py-3 border border-gray-300 text-black"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>
                Mot de passe{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="password"
                id="password"
                className="px-4 py-3 border border-gray-300 text-black"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4 " checked={check} onChange={()=>setCheck(!check)} />
              <label>Subscribe to our newsletter</label>
            </div>
            <ReCAPTCHA
              sitekey="6Lc2xVYjAAAAAIuk6-oEbePPkK0caIt1JrnPIOOp"
              // onChange={onChange}
            />
            <p className="text-[16px] text-[#603813] font-normal">
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
