import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as yup from "yup";
type RegisterProps = {
  submit: (value: any) => void;
  error?: boolean;
};

const schema = yup.object().shape({
  name: yup.string().required("Field is required."),
  email: yup
    .string()
    .required("Field is required.")
    .matches(
      //eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address" // Optional: Customize error message
    ),
  password: yup.string().required("Field is required.").trim(),
});

const Register: React.FC<RegisterProps> = ({ submit, error }) => {
  const [check, setCheck] = React.useState<boolean>(true);
  const [state, setState] = React.useState({
    captchaCode: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("errors", errors);

  const { captchaCode } = state;

  return (
    <div>
      <form
        className="flex flex-col space-y-5 border rounded-md p-6 text-[14.4px] font-semibold text-[#603813] "
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col space-y-1">
          <label>
            Identifiant <span className="text-red-500 text-[20px] ">*</span>
          </label>
          <input
            {...register("name")}
            required
            type="text"
            id="name"
            className="px-4 py-3 text-black border border-gray-300"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label>
            E-mail <span className="text-red-500 text-[20px] ">*</span>
          </label>
          <input
            {...register("email")}
            required
            id="email"
            className={twMerge(
              "px-4 py-3 text-black border border-gray-300 focus:border-transparent focus:ring-2 ring-[#1C64F2]  outline-none",
              errors.email && "border-[#ed2805]"
            )}
          />
          {errors.email && (
            <span className="text-sm text-[#ed2805]">
              {errors.email?.message}
            </span>
          )}
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
            className={twMerge(
              "px-4 py-3 text-black border border-gray-300 focus:border-transparent focus:ring-2 ring-[#1C64F2]  outline-none",
              errors.password && "border-[#ed2805]"
            )}
          />
          {errors.password && (
            <span className="text-sm text-[#ed2805]">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 "
            checked={check}
            onChange={() => setCheck(!check)}
          />
          <label>Subscribe to our newsletter</label>
        </div>
        {/* <ReCAPTCHA
          sitekey="6LfAUlsmAAAAAJhiDuM15XtkE1VUnAOOchhh9UGb"
          onChange={(captchaCode)=>{
            setState((pre)=>({...pre, captchaCode: captchaCode || ''})) 
          }}
        /> */}
        <p className="text-[16px] text-[#603813] font-normal">
          Vos données personnelles seront utilisées pour vous accompagner au
          cours de votre visite du site web, gérer l’accès à votre compte, et
          pour d’autres raisons décrites dans notre politique de
          confidentialité.
        </p>
        <div>
          <button
            type="submit"
            // disabled={_.isEmpty(captchaCode)}
            className="w-[200px] px-4 py-3 text-[16px] uppercase font-semibold text-white  bg-[#603813] rounded-md shadow hover:bg-black disabled:bg-gray-300"
          >
            S’enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
