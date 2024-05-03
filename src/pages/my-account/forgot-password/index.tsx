import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { POST } from "@utils/fetch";
import { api } from "@utils/apiRoute";
import useLocale from "@hooks/useLocale";

const ForgotPassword = () => {
  const [state, setState] = useState({
    message: "",
    type: "",
  });
  const { message, type } = state;
  const text = useLocale();
  // const [message,setMessage]=useState('')
  const mailRef = useRef<HTMLInputElement | null>(null);
  async function sendMail() {
    const res = await POST(api.forgotPassword, {
      email: mailRef.current?.value,
    });
    if (res.data.message === "Email doesn't exist") {
      setState((p) => ({
        ...p,
        message: "L'e-mail n'existe pas",
        type: "error",
      }));
    } else {
      setState((p) => ({
        ...p,
        message: "Succès, s'il vous plaît vérifier votre e-mail",
        type: "success",
      }));
    }
  }
  return (
    <div>
      <div className="grid h-20 content-center text-center bg-[#eff7cf]">
        <h1 className="text-4xl mb-2 font-extrabold">
          {text.accountScreen.mComplet}
        </h1>
      </div>

      <div className="ml-3">
        <p className="text-[#603813]">
          Mot de passe perdu ? Veuillez saisir votre identifiant ou votre
          adresse e-mail. Vous recevrez un lien par e-mail pour créer un nouveau
          mot de passe.
        </p>
        <strong className="text-[#603813]">Identifiant ou e-mail</strong> <br />
        {message && (
          <p className={type === "error" ? "text-red-700" : "text-green-600"}>
            {message}
          </p>
        )}
        <input
          ref={mailRef}
          required
          type="email"
          id="email"
          className="px-4 py-3 border border-gray-300 text-black mb-4 w-[40rem] focus:outline-none"
        />
        <ReCAPTCHA sitekey="6LfAUlsmAAAAAJhiDuM15XtkE1VUnAOOchhh9UGb" />
        <button
          onClick={sendMail}
          className=" px-4 py-3 text-[16px] uppercase font-semibold text-white  bg-[#603813] rounded-md shadow hover:bg-black my-5"
        >
          Réinitialisation du mot de passe
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
