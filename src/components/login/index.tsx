import { Routes } from "@definitions/constants";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
type LoginProps = {
  submit: (value: any) => void;
  checkEmpty?: boolean;
};

const Login: React.FC<LoginProps> = ({ submit }) => {
  const { register, handleSubmit } = useForm();
  const [showPass, setShowPass] = React.useState(false);

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col space-y-5 border rounded-md p-6 text-[14.4px] font-semibold text-[#603813]"
      >
        <div className="flex flex-col space-y-1">
          <label>
            E-mail <span className="text-red-500 text-[20px] ">*</span>
          </label>
          <input
            {...register("email")}
            required
            type="text"
            id="id"
            className="px-4 py-3 text-black border border-gray-300"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label>
            Mot de passe <span className="text-red-500 text-[20px] ">*</span>
          </label>
          <div className="relative grid items-center">
            <FontAwesomeIcon
              className="absolute right-0 mr-2 cursor-pointer"
              icon={showPass ? faEye : faEyeSlash}
              onClick={() => {
                setShowPass(!showPass);
              }}
            />
            {/* <FontAwesomeIcon icon={faEyeSlash}/> */}
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              required
              id="password"
              className="px-4 py-3 text-black border border-gray-300"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            // disabled={_.isEmpty(captchaCode)}
            className="w-[200px] px-4 py-3 text-[16px] uppercase font-semibold text-white  bg-[#603813] rounded-md shadow hover:bg-black disabled:bg-gray-300"
          >
            Identification
          </button>
        </div>
        <Link href={Routes.myAccount.children.forgotPassword.route}>
          <a className="text-base text-brow-300">Mot de passe perdu ?</a>
        </Link>
      </form>
    </>
  );
};

export default Login;
