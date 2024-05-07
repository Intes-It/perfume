import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "@hooks/useUser";
import { PUT } from "@utils/fetch";
import { useFormik } from "formik";
import { useState } from "react";
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

  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      name: "",
      email: "",
      password: undefined,
      new_password: undefined,
      confirm_password: undefined,
    },
    validationSchema: schema,
    onSubmit: (value) => {
      PUT("/api/user/profile", value).then((res) => {
        if (res?.status === 200) {
          setState((o) => ({
            ...o,
            error: true,
            message: "Mise à jour réussie",
            color: "#06e318",
          }));
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

  console.log("123", formik.errors);
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
          <span>{message}</span>
        </div>
      ) : (
        <div></div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3">
          <div className="grid grid-cols-2">
            <div className="flex flex-col mr-6">
              <label className="font-semibold">Prénom</label>
              <input
                type="text"
                id="first_name"
                defaultValue={user?.first_name}
                onChange={formik.handleChange}
                className={`px-4 py-3 border  text-black`}
              />
            </div>
            <div className="flex flex-col ml-6">
              <label className="font-semibold">Nom</label>
              <input
                type="text"
                id="last_name"
                defaultValue={user?.last_name}
                onChange={formik.handleChange}
                className={`px-4 py-3 border  text-black`}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Nom affiché</label>
            <input
              defaultValue={user?.name}
              type="text"
              id="name"
              readOnly
              onChange={formik.handleChange}
              className="px-4 py-3 text-black bg-gray-200 border border-gray-100 focus:border-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">E-mail</label>
            <input
              type="text"
              readOnly
              defaultValue={user?.email}
              id="email"
              className="px-4 py-3 text-black bg-gray-200 border border-gray-100 focus:border-transparent focus:outline-none focus:ring-0"
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
                className="px-4 py-3 text-black border border-gray-300"
              />
              {formik.errors?.password && (
                <span className="text-sm text-[#FF2626]">
                  {formik.errors?.password}
                </span>
              )}
            </div>
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
              {formik.errors?.new_password && (
                <span className="text-sm text-[#FF2626]">
                  {formik.errors?.new_password}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative grid items-center">
              <FontAwesomeIcon
                className="absolute right-0 mr-2 "
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
              {formik.errors?.confirm_password && (
                <span className="text-sm text-[#FF2626]">
                  {formik.errors?.confirm_password}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-[250px] p-3 rounded-md bg-[#603813] "
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
