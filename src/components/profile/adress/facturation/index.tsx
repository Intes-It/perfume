import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocale from "@hooks/useLocale";
import useUser from "@hooks/useUser";
import { showToast } from "@redux/slices/toast/toastSlice";
import { PATCH } from "@utils/fetch";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";
type FacturationProps = {
  onBack: () => void;
};

const Facturation: React.FC<FacturationProps> = ({ onBack }) => {
  const { user } = useUser();
  const [state, setState] = useState({
    error: false,
    message: "",
    color: "",
  });
  const [countries, setCountries] = useState<any[]>([]);
  const { error, message, color } = state;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name ? user?.first_name : "",
      last_name: user?.last_name ? user?.last_name : "",
      company: user?.company ? user?.company : "",
      country: user?.country ? user?.country : "",
      street: user?.street ? user?.street : "",
      address: user?.address ? user?.address : "",
      city: user?.city ? user?.city : "",
      postal_code: user?.postal_code ? user?.postal_code : "",
      phone_number: user?.phone ? user?.phone : "",
    },

    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      city: Yup.string().required("city is required"),
      street: Yup.string().required("street is required"),
      address: Yup.string().required("address is required"),
      postal_code: Yup.string().required("Postal code is required"),
      phone_number: Yup.string().required("Phone is required"),
    }),
    onSubmit: (value) => {
      PATCH("/api/user/update/", value)
        .then((res) => {
          if (res?.status === 200) {
            onBack();
            setState((o) => ({
              ...o,
              error: true,
              message: "Mise à jour réussie",
              color: "#06e318",
            }));
          } else if (res?.status === 500) {
            dispatch(
              showToast({
                message: "System disruption. Please try again",
                error: true,
              })
            );
            setState((o) => ({
              ...o,
              error: true,
              message: "Quelque chose s'est mal passé",
              color: "#ed2805",
            }));
            console.log(dispatch);
          }
        })
        .catch(() => {
          dispatch(
            showToast({
              message: "System disruption. Please try again",
              error: true,
            })
          );
        });
    },
  });
  console.log(formik.submitCount);

  const text = useLocale();

  const handleKeyDownPhone = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (
      isNaN(Number(e.key)) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "+" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
      return;
    }
    if (
      (value.includes("+") || e.currentTarget.selectionStart !== 0) &&
      e.key === "+"
    ) {
      e.preventDefault();
    }

    if (value.length >= 20 && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
    if (e.key === "e" || e.key === "." || e.key === "-" || e.key === ",") {
      e.preventDefault();
    }
  };
  const getCountries = async () => {
    const url = "https://countriesnow.space/api/v0.1/countries";
    let result: any;
    try {
      result = await axios.get(url);
      setCountries(result?.data?.data);
    } catch (error) {
      result = error;
    }
  };

  useEffect(() => {
    getCountries();
    formik.resetForm({ values: user });
  }, [user]);

  return (
    <div className="">
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
      <button
        onClick={onBack}
        className="w-[100px] mt-2 p-3 mb-3 rounded-md border border-black hover:bg-[#603813] hover:text-white"
      >
        Back
      </button>
      {/* form */}
      <div>
        <span className="text-[#26222f] text-[32px] font-bold">
          {text.accountScreen.aDFactur}
        </span>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-3">
            <div className="grid grid-cols-2">
              <div className="flex flex-col mr-6">
                <label className="font-semibold">
                  {text.accountScreen.prenom}{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  onChange={formik.handleChange}
                  required
                  type="text"
                  value={formik.values?.first_name}
                  id="first_name"
                  className={twMerge(
                    "px-4 py-3  text-black border-[0.5px] ",
                    formik.errors.first_name && formik.submitCount
                      ? "border-red-500"
                      : "border-gray-300"
                  )}
                />
                {formik.errors.first_name && formik.submitCount != 0 ? (
                  <div className="text-[12px] text-red-500">
                    {formik.errors.first_name.toString()}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col ml-6">
                <label className="font-semibold">
                  {"Last name "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values?.last_name}
                  type="text"
                  id="last_name"
                  className={twMerge(
                    "px-4 py-3 border-[0.5px]  text-black  ",
                    formik.errors.last_name && formik.submitCount
                      ? "border-red-500"
                      : "border-gray-300"
                  )}
                />
                {formik.errors.last_name && formik.submitCount != 0 ? (
                  <div className="text-[12px] text-red-500">
                    {formik.errors.last_name.toString()}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.nomDe}
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                value={formik.values?.company}
                id="company"
                className={twMerge(
                  "px-4 py-3 border-[0.5px]  text-black ",
                  formik.errors.company && formik.submitCount
                    ? "border-red-500"
                    : "border-gray-300"
                )}
              />
              {/* {formik.errors.company  ? (
                <div className="text-[12px] text-red">
                  {formik.errors.company.toString()}
                </div>
              ) : null} */}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.pRegion}{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <select
                data-te-select-init
                data-te-select-filter="true"
                onChange={formik.handleChange}
                value={formik.values?.country}
                id="country"
                className={twMerge(
                  "px-4 py-3 border-[0.5px]  text-black  ",
                  formik.errors.country && formik.submitCount
                    ? "border-red-500"
                    : "border-gray-300"
                )}
              >
                {countries &&
                  countries?.map((item: any, index: number) => (
                    <option key={index} value={item?.country}>
                      {item?.country}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.numeroEtNom}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                placeholder={text.accountScreen.numeroDe}
                onChange={formik.handleChange}
                type="text"
                value={formik.values?.street}
                id="street"
                className={twMerge(
                  "px-4 py-3 border-[0.5px]  text-black  ",
                  formik.errors.street && formik.submitCount
                    ? "border-red-500"
                    : "border-gray-300"
                )}
              />
              <input
                onChange={formik.handleChange}
                placeholder={text.accountScreen.batiAppar}
                type="text"
                id="address"
                value={formik.values?.address}
                className={twMerge(
                  "px-4 py-3 border-[0.5px]  text-black  mt-3 ",
                  formik.errors.address && formik.submitCount
                    ? "border-red-500"
                    : "border-gray-300"
                )}
              />
              {(formik.errors.address || formik.errors.street) &&
              formik.submitCount != 0 ? (
                <div className="text-[12px] text-red-500">
                  {"Street number and name is required"}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.ville}{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                value={formik.values?.city}
                id="city"
                className={twMerge(
                  "px-4 py-3 border-[0.5px]  text-black  ",
                  formik.errors.city && formik.submitCount
                    ? "border-red-500"
                    : "border-gray-300"
                )}
              />
              {formik.errors.city && formik.submitCount != 0 ? (
                <div className="text-[12px] text-red-500">
                  {formik.errors.city.toString()}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.codePostal}{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                id="postal_code"
                value={formik.values?.postal_code}
                className={twMerge(
                  "px-4 py-3 border-[0.5px]  text-black ",
                  formik.errors.postal_code && formik.submitCount
                    ? "border-red-500"
                    : "border-gray-300"
                )}
                maxLength={10}
              />
              {formik.errors.postal_code && formik.submitCount != 0 ? (
                <div className="text-[12px] text-red-500">
                  {formik.errors.postal_code.toString()}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.teleph}{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                value={formik.values?.phone_number}
                id="phone_number"
                onKeyDown={(e) => {
                  handleKeyDownPhone(e);
                }}
                className={twMerge(
                  "px-4 py-3 border-[0.5px]  text-black ",
                  formik.errors.phone_number && formik.submitCount
                    ? "border-red-500"
                    : "border-gray-300"
                )}
              />
              {formik.errors.phone_number && formik.submitCount != 0 ? (
                <div className="text-[12px] text-red-500">
                  {formik.errors.phone_number.toString()}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.email}{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                readOnly
                defaultValue={user?.email ? user?.email : ""}
                type="email"
                id="id"
                className={twMerge(
                  "px-4 py-3 border-[0.5px]  text-black border-gray-300 "
                )}
              />
            </div>
            <button
              type="submit"
              disabled={!formik.dirty}
              className="w-[200px] p-3 mt-3 text-black rounded-md border border-black bg-white hover:bg-[#603813] hover:text-white  disabled:bg-[#F5F5F5] disabled:cursor-not-allowed disabled:text-black"
            >
              <div className="text-[15px]   ">
                {text.accountScreen.sauvegarder}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Facturation;
