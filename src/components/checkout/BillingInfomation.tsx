import useUser from "@hooks/useUser";
import axios from "axios";
import { Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { billingInfo } from "src/pages/checkout";
import * as Yup from "yup";

type BillingInfomationProps = {
  handleOpenPaypal: (data: billingInfo) => void;
};

const BillingInfomation: React.FC<BillingInfomationProps> = ({
  handleOpenPaypal,
}) => {
  // const { isAuthenticated } = useUser();
  const formSchema = Yup.object().shape({
    first_name: Yup.string().trim().required("First Name is required."),
    last_name: Yup.string().trim().required("Last Name is required."),
    address: Yup.string().trim().required("Address is required."),
    country: Yup.string().trim().required("Address is required."),
    postal_code: Yup.string()
      .trim()
      .max(10)
      .required("Postal Code is required."),
    city: Yup.string().trim().required("City is required."),
    phone_number: Yup.string().trim().required("Phone is required."),
    email: Yup.string()
      .trim()
      .required("Email is required.")
      .email("Email is not valid.")
      .matches(
        //eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:$#%^&*!\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*)\.[a-zA-Z]{2,}|(\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]))$/,
        "Email is not valid." // Optional: Customize error message
      ),
    send_mail: Yup.boolean(),
  });
  const { user } = useUser();
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      company: user?.company || "",
      country: user?.country || "",
      address: user?.address || "",
      city: user?.city || "",
      postal_code: user?.postal_code || "",
      phone_number: user?.phone_number || "",
      email: user?.email || "",
      send_mail: true,
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validateOnMount: false,
    onSubmit: (value, { validate }: any) => {
      if (validate) validate(value);
      handleOpenPaypal(value);
    },
  });

  const { errors } = formik;
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

  const [countries, setCountries] = useState<any[]>([]);
  const defaultCountry = [
    { value: "France" },
    { value: "Viet Nam" },
    { value: "United Kingdom" },
    { value: "Dubai" },
  ];
  const getCountries = async () => {
    const url = "https://countriesnow.space/api/v0.1/countries";

    try {
      const res = await axios.get(url);

      if (res.status === 200) {
        setCountries(res?.data?.data);
      } else {
        setCountries(defaultCountry);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="">
      {/* form */}
      <div>
        <span className="text-[#603813] text-[32px] font-semibold">
          Billing Information
        </span>
        <Formik
          initialValues={formik.initialValues}
          onSubmit={formik.submitForm}
        >
          <Form>
            <div className="grid gap-3">
              <div className="grid grid-cols-2">
                <div className="flex flex-col mr-6">
                  <label className="font-semibold">
                    First Name{" "}
                    <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <input
                    {...formik.getFieldProps("first_name")}
                    type="text"
                    id="first_name"
                    className={`px-4 py-3 border ${
                      errors.first_name ? "border-red-700" : "border-gray-300"
                    } text-black`}
                    maxLength={50}
                  />
                  {errors.first_name && (
                    <span className="text-sm text-[#ed2805]">
                      {errors.first_name.toString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col ml-6">
                  <label className="font-semibold">
                    Last Name{" "}
                    <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <input
                    {...formik.getFieldProps("last_name")}
                    type="text"
                    id="last_name"
                    className={`px-4 py-3 border ${
                      errors.last_name ? "border-red-700" : "border-gray-300"
                    } text-black`}
                    maxLength={50}
                  />
                  {errors.last_name && (
                    <span className="text-sm text-[#ed2805]">
                      {errors.last_name.toString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Name of company (optional)
                </label>
                <input
                  {...formik.getFieldProps("company")}
                  type="text"
                  id="company_name"
                  className="px-4 py-3 text-black border border-gray-300"
                  maxLength={100}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Country/region{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <select
                  {...formik.getFieldProps("country")}
                  id="country"
                  className={`px-4 py-3 border ${
                    errors.country ? "border-red-700" : "border-gray-300"
                  } text-black`}
                  onChange={(event) => {
                    formik.setFieldValue("country", event.target.value);
                  }}
                  value={formik.values.country}
                >
                  <option hidden></option>
                  {countries.map((c, index: number) => (
                    <option key={index} value={c.country}>
                      {c.country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="text-sm text-[#ed2805]">
                    {errors.country.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Address <span className="text-red-500 text-[20px] ">*</span>
                </label>

                <input
                  {...formik.getFieldProps("address")}
                  type="text"
                  id="address"
                  className={`px-4 py-3 border ${
                    errors.address ? "border-red-700" : "border-gray-300"
                  } text-black`}
                  maxLength={100}
                />
                {errors.address && (
                  <span className="text-sm text-[#ed2805]">
                    {errors.address.toString()}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">
                  Postal Code
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  {...formik.getFieldProps("postal_code")}
                  type="text"
                  id="postal_code"
                  className={`px-4 py-3 border ${
                    errors.postal_code ? "border-red-700" : "border-gray-300"
                  } text-black`}
                  maxLength={10}
                />
                {errors.postal_code && (
                  <span className="text-sm text-[#ed2805]">
                    {errors.postal_code.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  City <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  {...formik.getFieldProps("city")}
                  type="text"
                  id="city"
                  className={`px-4 py-3 border ${
                    errors.city ? "border-red-700" : "border-gray-300"
                  } text-black`}
                  maxLength={100}
                />
                {errors.city && (
                  <span className="text-sm text-[#ed2805]">
                    {errors.city.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Phone <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  {...formik.getFieldProps("phone_number")}
                  type="text"
                  id="phone_number"
                  className={`px-4 py-3 border ${
                    errors.phone_number ? "border-red-700" : "border-gray-300"
                  } text-black`}
                  onKeyDown={handleKeyDownPhone}
                />
                {errors.phone_number && (
                  <span className="text-sm text-[#ed2805]">
                    {errors.phone_number.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">
                  Email <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  {...formik.getFieldProps("email")}
                  id="id"
                  className={`px-4 py-3 border ${
                    errors.email ? "border-red-700" : "border-gray-300"
                  } text-black`}
                />
                {errors.email && (
                  <span className="text-sm text-[#ed2805]">
                    {errors.email.toString()}
                  </span>
                )}
              </div>
              {/* {!isAuthenticated && ( */}
              <>
                <div className="flex justify-between font-normal">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      {...formik.getFieldProps("send_mail")}
                      id="subscribe"
                      className="w-4 h-4 outline-none focus:ring-0"
                    />
                    <label>Receive order email</label>
                  </div>
                </div>
                {/* <div className="flex justify-between font-semibold">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    onChange={(e) => {
                      console.log(e);
                    }}
                    id="remember"
                    className="w-4 h-4 "
                  />
                  <label>Créer un compte ?</label>
                </div>
              </div> */}
              </>
              {/* )} */}
            </div>
            <div className="flex float-right gap-3 mt-10 ">
              <button
                className="w-[300px] h-[48px] rounded-md p-3  text-white hover:text-white text-[16px] font-bold bg-[#603813]"
                type="submit"
              >
                PAYMENT
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default BillingInfomation;
