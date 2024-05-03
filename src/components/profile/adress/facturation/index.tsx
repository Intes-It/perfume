import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocale from "@hooks/useLocale";
import useUser from "@hooks/useUser";
import { PUT } from "@utils/fetch";
import axios from "axios";
import { useFormik } from "formik";
// import * as Yup from "yup";
import React, { useEffect, useState } from "react";
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
  // const formSchema = Yup.object().shape({
  //   country: Yup.string().required(),
  //   province: Yup.string().required(),
  //   wards: Yup.string().required(),
  //   district: Yup.string().required(),
  //   zip_code: Yup.string().required(),
  //   phone: Yup.string().required(),
  //   last_name: Yup.string().required(),
  //   first_name: Yup.string().required(),
  // });
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      company_name: user?.company_name,
      country: user?.country,
      wards: user?.wards,
      district: user?.district,
      province: user?.province,
      zip_code: user?.zip_code,
      phone: user?.phone,
    },
    // initialErrors: {
    //   first_name: "required",
    //   last_name: "required",
    //   country: "required",
    //   province: "required",
    //   wards: "required",
    //   district: "required",
    //   zip_code: "required",
    //   phone: "required",
    // },
    // validationSchema: formSchema,
    onSubmit: (value) => {
      PUT("/api/user/profile", value).then((res) => {
        if (res?.status === 200) {
          window.location.reload();
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
  const { errors } = formik;
  const text = useLocale();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.length >= 20 && e.key !== "Backspace" && e.key !== "Delete") {
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
  }, []);
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
                  defaultValue={user?.first_name}
                  id="first_name"
                  className={"px-4 py-3 border border-gray-300 text-black"}
                />
              </div>
              <div className="flex flex-col ml-6">
                <label className="font-semibold">
                  {text.accountScreen.nom}{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  onChange={formik.handleChange}
                  defaultValue={user?.last_name}
                  type="text"
                  id="last_name"
                  className={"px-4 py-3 border border-gray-300 text-black"}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.nomDe}
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                defaultValue={user?.company_name}
                id="company_name"
                className="px-4 py-3 border border-gray-300 text-black"
              />
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
                id="country"
                className={`px-4 py-3 border ${
                  errors.country ? "border-red-700" : "border-gray-300"
                } text-black`}
                defaultValue={"France"}
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
                defaultValue={user?.wards}
                id="wards"
                className={"px-4 py-3 border  border-gray-300 text-black"}
              />
              <input
                onChange={formik.handleChange}
                placeholder={text.accountScreen.batiAppar}
                type="text"
                id="district"
                defaultValue={user?.district}
                className={`px-4 py-3 mt-4 border ${
                  errors.district ? "border-red-700" : "border-gray-300"
                } text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.ville}{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                defaultValue={user?.province}
                id="province"
                className={`px-4 py-3 border ${
                  errors.province ? "border-red-700" : "border-gray-300"
                } text-black`}
              />
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
                defaultValue={user?.zip_code}
                className={`px-4 py-3  border ${
                  errors.zip_code ? "border-red-700" : "border-gray-300"
                } text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.teleph}{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="number"
                defaultValue={user?.phone}
                id="phone"
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }}
                className={`px-4 py-3  border border-gray-300
                 text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                {text.accountScreen.email}{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                readOnly
                defaultValue={user?.email}
                type="email"
                id="id"
                className={`px-4 py-3 border border-gray-300 text-black`}
              />
            </div>
            <button
              type="submit"
              className="w-[200px] p-3 mt-3 text-black rounded-md border border-black bg-white hover:bg-[#603813] hover:text-white "
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
