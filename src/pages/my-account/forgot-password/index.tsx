import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword = () => {
  return (
    <div>
      <div className="grid h-20 content-center text-center bg-[#eff7cf]">
        <h1 className="text-4xl mb-2 font-extrabold">Mon Compte</h1>
      </div>
      <div className="ml-3">
        <p className="text-[#603813]">
          Mot de passe perdu ? Veuillez saisir votre identifiant ou votre
          adresse e-mail. Vous recevrez un lien par e-mail pour créer un nouveau
          mot de passe.
        </p>
        <strong className="text-[#603813]">Identifiant ou e-mail</strong> <br />
        <input
          required
          type="email"
          id="email"
          className="px-4 py-3 border border-gray-300 text-black mb-4 w-[38rem] focus:outline-none"
        />
        <ReCAPTCHA sitekey="6LcF1twkAAAAAMKsDQ71Bhktr3g0Q66sZM5bngyA" />
        <button
          type="submit"
          className=" px-4 py-3 text-[16px] uppercase font-semibold text-white  bg-[#603813] rounded-md shadow hover:bg-black my-5"
        >
          Réinitialisation du mot de passe
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
