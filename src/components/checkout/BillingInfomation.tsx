import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";

import { Countries } from "@definitions/constants";
// import { useQuery } from "react-query";
import useUser from "@hooks/useUser";

type BillingInfomationProps = {
  onError?: (errors: any) => void;
  onValueChange?: (values: any) => void;
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
}) => {
  const { isAuthenticated } = useUser();
  const formSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    // country: Yup.tuple().required(),
    ward: Yup.string().required(),
    // district: Yup.string().required(),
    zip_code: Yup.string().required(),
    province: Yup.string().required(),
    phone: Yup.number().required(),
    email: Yup.string().required(),
  });
const {user}=useUser()

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      company_name: "",
      country: Countries[0].value,
      ward: "",

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
  const { errors, values } = formik;
const countrys=[
  {value:'France'},
  {value:'Viet Nam'},
  {value:'United Kingdom'},
  {value:'Dubai'},

]
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
        <span className="text-[#26222f] text-[32px] font-semibold">
          Détails de facturation
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
                  Prénom <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  {...formik.getFieldProps("first_name")}
                  type="text"
                  id="first_name"
                  className={`px-4 py-3 border ${
                    errors.first_name ? "border-red-700" : "border-gray-300"
                  } text-black`}
                />
              </div>
              <div className="flex flex-col ml-6">
                <label className="font-semibold">
                  Nom <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  {...formik.getFieldProps("last_name")}
                  type="text"
                  id="last_name"
                  className={`px-4 py-3 border ${
                    errors.last_name ? "border-red-700" : "border-gray-300"
                  } text-black`}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Nom de l’entreprise (facultatif)
              </label>
              <input
                {...formik.getFieldProps("company_name")}
                type="text"
                id="company_name"
                className="px-4 py-3 border border-gray-300 text-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Pays/région <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <select
                data-te-select-init
                data-te-select-filter="true"
                {...formik.getFieldProps("country")}
                id="country"
                className={`px-4 py-3 border ${
                  errors.country ? "border-red-700" : "border-gray-300"
                } text-black`}
                onChange={(event) => {
                  formik.setFieldValue("country", event.target.value);
                }}
              >
                {countrys.map(
                  (c, index: number) => (
                    <option key={index} value={c.value}>
                      {c.value}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Numéro et nom de rue{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("ward")}
                type="text"
                id="ward"
                className={`px-4 py-3 border ${
                  errors.ward ? "border-red-700" : "border-gray-300"
                } text-black`}
              />
              {/* <input
                {...formik.getFieldProps("district")}
                type="text"
                id="district"
                className={`px-4 py-3 mt-4 border ${
                  errors.district ? "border-red-700" : "border-gray-300"
                } text-black`}
              /> */}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Ville <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("province")}
                type="text"
                id="province"
                className={`px-4 py-3 border ${
                  errors.province ? "border-red-700" : "border-gray-300"
                } text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Code postal <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("zip_code")}
                type="text"
                id="zip_code"
                className={`px-4 py-3 mt-4 border ${
                  errors.zip_code ? "border-red-700" : "border-gray-300"
                } text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Téléphone <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("phone")}
                type="text"
                id="phone"
                className={`px-4 py-3 mt-4 border ${
                  errors.phone ? "border-red-700" : "border-gray-300"
                } text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                E-mail <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps("email")}
                type="email"
                id="id"
                className={`px-4 py-3 mt-4 border ${
                  errors.email ? "border-red-700" : "border-gray-300"
                } text-black`}
              />
            </div>
            {!isAuthenticated && (
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
                    <label>Subscribe to our newsletter</label>
                  </div>
                </div>
                <div className="flex justify-between font-semibold">
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
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingInfomation;
