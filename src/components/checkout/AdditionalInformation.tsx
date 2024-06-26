import { Countries } from "@definitions/constants";
import { useFormik } from "formik";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";

type AdditionalInfomationProps = {
  onError?: (errors: any) => void;
  onValueChange?: (values: any, expanded: boolean) => void;
};

const AdditionalInformation: React.FC<AdditionalInfomationProps> = ({
  onError,
  onValueChange,
}) => {
  const [state, setState] = useState({
    check: false,
  });
  const { check } = state;
  

  const formSchema = Yup.object().shape({
    dif_first_name: Yup.string().required(),
    dif_last_name: Yup.string().required(),
    dif_country: Yup.string().required(),
    dif_ward: Yup.string().required(),
    dif_district: Yup.string().required(),
    dif_province: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      dif_first_name: "",
      dif_last_name: "",
      dif_company_name: "",
      dif_country: Countries[0].value,
      dif_ward: "",
      dif_district: "",
      dif_province: "",
      note: "",
    },
    initialErrors: {
      dif_first_name: "required",
      dif_last_name: "required",
      // dif_country: {name:'required', value:'required'},
      dif_ward: "required",
      dif_district: "required",
      dif_province: "required",
    },
    validationSchema: formSchema,
    onSubmit: (value) => {
      console.log(value)
    },
  });
  const { errors, values } = formik;

  useEffect(() => {
    if (check) onError?.(errors);
  }, [errors]);

  useEffect(() => {
    onValueChange?.(values, check);
  }, [values, check]);

  useEffect(() => {
    if (check) {
      onError?.(errors);
    } else onError?.(null);
  }, [check]);

  return (
    <div className="bg-[#FBFBFB] ">
      <div className="flex items-center">
        <input
          type="checkbox"
          onChange={() => setState((o) => ({ ...o, check: !check }))}
          checked={check}
          id="remember"
          className="w-4 h-4 mt-3 mr-2 "
        />
        {/* <label>Expédier à une adresse différente ?</label> */}
        <span className="text-black text-[32px] font-semibold">
          Ship to a different address ?
        </span>
      </div>
      {/* form */}

      <div>
        <form>
          <div className="grid gap-3">
            {check ? (
              <div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col mr-6">
                    <label className="font-semibold">
                      First Name{" "}
                      <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <input
                      {...formik.getFieldProps("dif_first_name")}
                      type="text"
                      id="dif_first_name"
                      className={`px-4 py-3 border ${
                        errors.dif_first_name
                          ? "border-red-700"
                          : "border-gray-300"
                      } text-black`}
                    />
                  </div>
                  <div className="flex flex-col ml-6">
                    <label className="font-semibold">
                      Last Name <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <input
                      {...formik.getFieldProps("dif_last_name")}
                      type="text"
                      id="dif_last_name"
                      className={`px-4 py-3 border ${
                        errors.dif_last_name
                          ? "border-red-700"
                          : "border-gray-300"
                      } text-black`}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Company name (optional)
                  </label>
                  <input
                    {...formik.getFieldProps("dif_company_name")}
                    type="text"
                    id="dif_company_name"
                    className="px-4 py-3 border border-gray-300 text-black"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Region{" "}
                    <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <select
                    data-te-select-init
                    data-te-select-filter="true"
                    {...formik.getFieldProps("dif_country")}
                    id="dif_country"
                    className={`px-4 py-3 border ${
                      errors.dif_country ? "border-red-700" : "border-gray-300"
                    } text-black`}
                    onChange={(event) => {
                      formik.setFieldValue("dif_country", event.target.value);
                    }}
                  >
                    {Countries?.map((item: any, index: number) => (
                      <option key={index} value={item?.value}>
                        {item?.name}
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
                    {...formik.getFieldProps("dif_ward")}
                    type="text"
                    id="dif_ward"
                    className={`px-4 py-3 border ${
                      errors.dif_ward ? "border-red-700" : "border-gray-300"
                    } text-black`}
                  />
                  <input
                    {...formik.getFieldProps("dif_district")}
                    type="text"
                    id="dif_district"
                    className={`px-4 py-3 mt-4 border ${
                      errors.dif_district ? "border-red-700" : "border-gray-300"
                    } text-black`}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    City <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <input
                    {...formik.getFieldProps("dif_province")}
                    type="text"
                    id="dif_province"
                    className={`px-4 py-3 border ${
                      errors.dif_province ? "border-red-700" : "border-gray-300"
                    } text-black`}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex flex-col">
              <label className="font-semibold">
                Order Notes (optional)
              </label>
              <textarea
                placeholder="Comments regarding your order, e.g. delivery instructions"
                {...formik.getFieldProps("note")}
                id="id"
                className="px-4 py-2 h-[60px] mt-2 border border-gray-300 text-black bg-white"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdditionalInformation;
