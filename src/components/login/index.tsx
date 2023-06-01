import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { Routes } from "@definitions/constants";
import { useForm } from "react-hook-form";
import { POST } from "@utils/fetch";
import { api } from "@utils/apiRoute";
import useUser from "@hooks/useUser";
import { FieldValues } from "react-hook-form";
import _ from "lodash";
type loginData = {
  email: string;
  user_name: string;
  password: string;
} & FieldValues;
type LoginProps = {
  submit: (value: any) => void;
  checkEmpty?: boolean;
};

const Login: React.FC<LoginProps> = ({ submit, checkEmpty }) => {
  const { register, handleSubmit } = useForm();
  const [state, setState] = React.useState({
    captchaCode: "",
  });
  const { captchaCode } = state;

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col space-y-5 border rounded-md p-6 text-[14.4px] font-semibold text-[#603813]"
      >
        <div className="flex flex-col space-y-1">
          <label>
            E-mail{" "}
            <span className="text-red-500 text-[20px] ">*</span>
          </label>
          <input
            {...register("email")}
            required
            type="text"
            id="id"
            className="px-4 py-3 border border-gray-300 text-black"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label>
            Mot de passe <span className="text-red-500 text-[20px] ">*</span>
          </label>
          <input
            {...register("password")}
            required
            type="password"
            id="password"
            className="px-4 py-3 border border-gray-300 text-black"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="w-4 h-4 " />
            <label>Se souvenir de moi</label>
          </div>
        </div>
        <ReCAPTCHA
          sitekey="6LfAUlsmAAAAAJhiDuM15XtkE1VUnAOOchhh9UGb"
          onChange={(captchaCode) => {
            setState((pre) => ({ ...pre, captchaCode: captchaCode || "" }));
          }}
        />
        <div>
          <button
            type="submit"
            disabled={_.isEmpty(captchaCode)}
            className="w-[200px] px-4 py-3 text-[16px] uppercase font-semibold text-white  bg-[#603813] rounded-md shadow hover:bg-black disabled:bg-gray-300"
          >
            Identification
          </button>
        </div>
        <Link href={Routes.myAccount.children.forgotPassword.route}>
          <a className="text-base  text-brow-300">Mot de passe perdu ?</a>
        </Link>
      </form>
    </>
  );
};

export default Login;
