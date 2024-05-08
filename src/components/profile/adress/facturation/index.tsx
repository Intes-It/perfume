import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocale from "@hooks/useLocale";
import useUser from "@hooks/useUser";
import { PUT } from "@utils/fetch";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@redux/slices/toast/toastSlice";
import { twMerge } from "tailwind-merge";
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
      company_name: user?.company_name ? user?.company_name : "",
      country: user?.country ? user?.country : "",
      wards: user?.wards ? user?.wards : "",
      district: user?.district ? user?.district : "",
      province: user?.province ? user?.province : "",
      zip_code: user?.zip_code ? user?.zip_code : "",
      phone: user?.phone ? user?.phone : "",
    },

    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      province: Yup.string().required("Province is required"),
      wards: Yup.string().required("Wards is required"),
      district: Yup.string().required("District is required"),
      zip_code: Yup.string().required("Postal code is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: (value) => {
      PUT("/api/user/profile", value).then((res) => {
        if (res?.status === 200) {
          onBack();
          setState((o) => ({
            ...o,
            error: true,
            message: "Mise à jour réussie",
            color: "#06e318",
          }));
        } else if (res?.status === 500) {
          dispatch(showToast("System disruption. Please try again"));
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

  const text = useLocale();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.length >= 20 && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
    if (e.key === "e" || e.key === ".") {
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
          <span>{message}</span>
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
                    "px-4 py-3 ring-[0.5px]  text-black border-none ",
                    formik.errors.first_name && formik.submitCount
                      ? "ring-red-500"
                      : "ring-gray-300"
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
                    "px-4 py-3 ring-[0.5px]  text-black border-none ",
                    formik.errors.last_name && formik.submitCount
                      ? "ring-red-500"
                      : "ring-gray-300"
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
                value={formik.values?.company_name}
                id="company_name"
                className={twMerge(
                  "px-4 py-3 ring-[0.5px]  text-black border-none ",
                  formik.errors.company_name && formik.submitCount
                    ? "ring-red-500"
                    : "ring-gray-300"
                )}
              />
              {/* {formik.errors.company_name  ? (
                <div className="text-[12px] text-red">
                  {formik.errors.company_name.toString()}
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
                  "px-4 py-3 ring-[0.5px]  text-black border-none ",
                  formik.errors.country && formik.submitCount
                    ? "ring-red-500"
                    : "ring-gray-300"
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
                value={formik.values?.wards}
                id="wards"
                className={twMerge(
                  "px-4 py-3 ring-[0.5px]  text-black border-none ",
                  formik.errors.wards && formik.submitCount
                    ? "ring-red-500"
                    : "ring-gray-300"
                )}
              />
              <input
                onChange={formik.handleChange}
                placeholder={text.accountScreen.batiAppar}
                type="text"
                id="district"
                value={formik.values?.district}
                className={twMerge(
                  "px-4 py-3 ring-[0.5px]  text-black  mt-3 border-none",
                  formik.errors.district && formik.submitCount
                    ? "ring-red-500"
                    : "ring-gray-300"
                )}
              />
              {(formik.errors.district || formik.errors.wards) &&
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
                value={formik.values?.province}
                id="province"
                className={twMerge(
                  "px-4 py-3 ring-[0.5px]  text-black border-none ",
                  formik.errors.province && formik.submitCount
                    ? "ring-red-500"
                    : "ring-gray-300"
                )}
              />
              {formik.errors.province && formik.submitCount != 0 ? (
                <div className="text-[12px] text-red-500">
                  {formik.errors.province.toString()}
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
                type="number"
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }}
                id="zip_code"
                value={formik.values?.zip_code}
                className={twMerge(
                  "px-4 py-3 ring-[0.5px]  text-black border-none",
                  formik.errors.zip_code && formik.submitCount
                    ? "ring-red-500"
                    : "ring-gray-300"
                )}
              />
              {formik.errors.zip_code && formik.submitCount != 0 ? (
                <div className="text-[12px] text-red-500">
                  {formik.errors.zip_code.toString()}
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
                type="number"
                value={formik.values?.phone}
                id="phone"
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }}
                className={twMerge(
                  "px-4 py-3 ring-[0.5px]  text-black border-none",
                  formik.errors.phone && formik.submitCount
                    ? "ring-red-500"
                    : "ring-gray-300"
                )}
              />
              {formik.errors.phone && formik.submitCount != 0 ? (
                <div className="text-[12px] text-red-500">
                  {formik.errors.phone.toString()}
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
                  "px-4 py-3 ring-[0.5px]  text-black ring-gray-300 border-none"
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
