import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "@hooks/useUser";
import { api } from "@utils/apiRoute";
import { PATCH, PUT } from "@utils/fetch";
import { deleteCookie } from "cookies-next";
import { useFormik } from "formik";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup.string(),
  new_password: yup.string().when("password", {
    is: (val: string | undefined) => val && val.length > 0,
    then: (schema) =>
      schema
        .required("Field is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z]).+$/,
          "At least one lower-case letter, one upper-case letter. "
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/,
          "At least one special character"
        )
        .matches(/.*[0-9].*/, "At least one number (0-9).")
        .matches(/^.{8,}$/, "At least 8 characters in length.")
        .test(
          "passwords-match",
          "New password is duplicate the current password",
          function (value) {
            return this.parent.old_password !== value;
          }
        ),
  }),
  confirm_password: yup.string().when("password", {
    is: (val: string | undefined) => val && val.length > 0,
    then: (schema) =>
      schema
        .required("Field is required")
        .test(
          "passwords-match",
          "Confirm password is not match",
          function (value) {
            return this.parent.new_password === value;
          }
        ),
  }),
});
const Detail = () => {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const [state, setState] = useState({
    message: "",
    color: "",
    error: false,
  });

  const { message, color, error } = state;
  const { user } = useUser();

  const handleChangePass = (payload: any) => {
    payload = {
      old_password: payload?.password,
      new_password: payload?.new_password,
    };

    PUT(api.change_password, payload).then((res) => {
      if (res?.status === 200) {
        setState((o) => ({
          ...o,
          error: true,
          message: "Mise à jour réussie",
          color: "#06e318",
        }));
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        window.location.reload();
      } else {
        setState((o) => ({
          ...o,
          error: true,
          message: res?.data?.message,
          color: "#ed2805",
        }));
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username,
      email: user?.email,
      password: undefined,
      new_password: undefined,
      confirm_password: undefined,
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: (value, { validate }: any) => {
      if ((value.new_password || value.new_password) && !value.password) {
        formik.setFieldError("password", "Password is required");
        return;
      }
      if (validate) validate(value);
      if (value?.password) handleChangePass(value as any);

      if (value.username)
        PATCH(api.update_user, { username: value.username }).then((res) => {
          if (res?.status === 200) {
            setState((o) => ({
              ...o,
              error: true,
              message: "Mise à jour réussie",
              color: "#06e318",
            }));
            formik.resetForm(value as any);
          } else {
            setState((o) => ({
              ...o,
              error: true,
              message: "Quelque chose s'est mal passé",
              color: "#ed2805",
            }));
          }
        });
    },
  });

  return (
    <div>
      {error ? (
        <div
          style={{
            borderColor: `${color}`,
          }}
          className={`mt-4 border-t-[3px]  bg-[#f6f7f6] p-5`}
        >
          <FontAwesomeIcon
            icon={faWindowMaximize}
            className="mr-3"
            fontSize={"1.2rem"}
          />
          <span
            style={{
              color: color,
            }}
          >
            {message}
          </span>
        </div>
      ) : (
        <div></div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3">
          <div className="flex flex-col">
            <label className="font-semibold">Nom affiché</label>
            <input
              defaultValue={user?.username}
              type="text"
              id="username"
              onChange={formik.handleChange}
              className="px-4 py-3 text-black border border-gray-100 focus:border-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">E-mail</label>
            <input
              type="text"
              readOnly
              defaultValue={user?.email}
              id="email"
              className="px-4 py-3 text-black bg-gray-200 border border-gray-100 cursor-not-allowed focus:border-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold">
              Mot de passe actuel (laisser vide pour le conserver)
            </label>
            <div className="relative grid items-center">
              <FontAwesomeIcon
                className="absolute right-0 mr-2 "
                icon={showOldPass ? faEye : faEyeSlash}
                onClick={() => {
                  setShowOldPass(!showOldPass);
                }}
              />
              {/* <FontAwesomeIcon icon={faEyeSlash}/> */}
              <input
                type={showOldPass ? "text" : "password"}
                id="password"
                onChange={formik.handleChange}
                className={twMerge(
                  "px-4 py-3 text-black border border-gray-300",
                  formik?.errors?.password && "border-[#FF2626]"
                )}
              />
            </div>
            {formik.errors?.password && (
              <span className="text-sm text-[#FF2626] mt-1">
                {formik.errors?.password}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Nouveau mot de passe (laisser vide pour conserver l’actuel)
            </label>
            <div className="relative grid items-center">
              <FontAwesomeIcon
                className="absolute right-0 mr-2"
                icon={showNewPass ? faEye : faEyeSlash}
                onClick={() => {
                  setShowNewPass(!showNewPass);
                }}
              />
              <input
                type={showNewPass ? "text" : "password"}
                id="new_password"
                onChange={formik.handleChange}
                className="px-4 py-3 text-black border border-gray-300"
              />
            </div>
            {formik.errors?.new_password && (
              <span className="text-sm text-[#FF2626] mt-1">
                {formik.errors?.new_password}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative grid items-center">
              <FontAwesomeIcon
                className="absolute right-0 mr-2 top-1/2 "
                icon={showConfPass ? faEye : faEyeSlash}
                onClick={() => {
                  setShowConfPass(!showConfPass);
                }}
              />
              <input
                type={showConfPass ? "text" : "password"}
                id="confirm_password"
                onChange={formik.handleChange}
                className="px-4 py-3 mt-4 border"
              />
            </div>
            {formik.errors?.confirm_password && (
              <span className="text-sm text-[#FF2626] mt-1 ">
                {formik.errors?.confirm_password}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={twMerge(
              "w-[250px] p-3 rounded-md bg-[#603813] cursor-pointer transition-all duration-300 ease-in-out",
              !formik.dirty && "opacity-60 bg-gray-300"
            )}
            disabled={!formik.dirty}
          >
            <div className="text-[15px]  text-white">
              Enregister les modifications
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Detail;
