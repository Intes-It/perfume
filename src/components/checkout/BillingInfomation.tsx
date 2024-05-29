import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";

// import { Countries } from "@definitions/constants";
// import { useQuery } from "react-query";
import useUser from "@hooks/useUser";

type BillingInfomationProps = {
  onError?: (errors: any) => void;
  onValueChange?: (values: any) => void;
  checkerror?: boolean;
};
/* async function getCountry() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags"
  );
  return res.json();
} */
const BillingInfomation: React.FC<BillingInfomationProps> = ({
  onError,
  onValueChange,
  checkerror,
}) => {
  // const { isAuthenticated } = useUser();
  const formSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    // country: Yup.tuple().required(),
    ward: Yup.string().required(),
    district: Yup.string().required(),
    zip_code: Yup.string().max(10).required(),
    province: Yup.string().required(),
    phone: Yup.number().required(),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
  });
  const { user } = useUser();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      company_name: "",
      country: "United Kingdom",
      ward: "",
      district: "",
      province: "",
      zip_code: "",
      phone: "",
      email: user?.email,
    },
    initialErrors: {
      first_name: "required",
      last_name: "required",
      // country: Yup.tuple().required(),
      ward: "required",
      district: "required",
      zip_code: "required",
      province: "required",
      phone: "required",
      email: "required",
    },
    validationSchema: formSchema,
    onSubmit: (value) => {
      console.log(value);
    },
  });
  console.log(checkerror);
  const { errors, values } = formik;
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
  const countrys = [
    { value: "France" },
    { value: "Viet Nam" },
    { value: "United Kingdom" },
    { value: "Dubai" },
  ];
  useEffect(() => {
    onError?.(errors);
  }, [errors]);

  useEffect(() => {
    onValueChange?.(values);
  }, [values]);

  return (
    <div className="">
      {/* form */}
      <div>
        <span className="text-[#603813] text-[32px] font-semibold">
          Billing Information
        </span>
        <form
          onInvalidCapture={() => {
            console.log("re");
          }}
        >
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
                    checkerror && errors.first_name
                      ? "border-red-700"
                      : "border-gray-300"
                  } text-black`}
                  maxLength={50}
                />
              </div>
              <div className="flex flex-col ml-6">
                <label className="font-semibold">
                  Last Name <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  {...formik.getFieldProps("last_name")}
                  type="text"
                  id="last_name"
                  className={`px-4 py-3 border ${
                    checkerror && errors.last_name
                      ? "border-red-700"
                      : "border-gray-300"
                  } text-black`}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Name of company (optional)
              </label>
              <input
                {...formik.getFieldProps("company_name")}
                type="text"
                id="company_name"
                className="px-4 py-3 border border-gray-300 text-black"
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
                  checkerror && errors.country
                    ? "border-red-700"
                    : "border-gray-300"
                } text-black`}
                onChange={(event) => {
                  formik.setFieldValue("country", event.target.value);
                }}
              >
                <option hidden></option>
                {countrys.map((c, index: number) => (
                  <option key={index} value={c.value}>
                    {c.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Street number and name{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("ward")}
                type="text"
                id="ward"
                placeholder="Lane number and street name"
                className={`px-4 py-3 border ${
                  checkerror && errors.ward
                    ? "border-red-700"
                    : "border-gray-300"
                } text-black`}
                maxLength={100}
              />
              <input
                {...formik.getFieldProps("district")}
                type="text"
                id="district"
                placeholder="Building apartment, lot, etc, (optional)"
                className={`px-4 py-3 mt-2 border ${
                  checkerror && errors.district
                    ? "border-red-700"
                    : "border-gray-300"
                } text-black`}
                maxLength={100}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">
                Postal Code<span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("zip_code")}
                type="text"
                id="zip_code"
                className={`px-4 py-3 mt-4 border ${
                  checkerror && errors.zip_code
                    ? "border-red-700"
                    : "border-gray-300"
                } text-black`}
                maxLength={10}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                City <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("province")}
                type="text"
                id="province"
                className={`px-4 py-3 border ${
                  checkerror && errors.province
                    ? "border-red-700"
                    : "border-gray-300"
                } text-black`}
                maxLength={100}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Phone <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("phone")}
                type="text"
                id="phone"
                className={`px-4 py-3 mt-4 border ${
                  checkerror && errors.phone
                    ? "border-red-700"
                    : "border-gray-300"
                } text-black`}
                onKeyDown={handleKeyDownPhone}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Email <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("email")}
                type="email"
                id="id"
                className={`px-4 py-3 mt-4 border ${
                  checkerror && errors.email
                    ? "border-red-700"
                    : "border-gray-300"
                } text-black`}
              />
              {formik.errors.email && checkerror ? (
                <div className="text-[12px] text-red-500">
                  {formik.errors.email.toString()}
                </div>
              ) : null}
            </div>
            {/* {!isAuthenticated && ( */}
            <>
              <div className="flex justify-between font-semibold">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={(e) => {
                      console.log(e);
                    }}
                    id="subscribe"
                    className="w-4 h-4 "
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
        </form>
      </div>
    </div>
  );
};

export default BillingInfomation;
