import { Countries } from '@definitions/constants';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

type AdditionalInfomationProps = {
  onError?: (errors: any) => void;
  onValueChange?: (values: any) => void;
};
  
const AdditionalInformation: React.FC<AdditionalInfomationProps> =
  ({ onError, onValueChange }) => {
    const [state, setState] = useState({
      check: false,
    });
    const { check } = state;
    
    const formSchema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      country: Yup.string().required(),
      ward: Yup.string().required(),
      district: Yup.string().required(), 
      province: Yup.string().required(), 
    });
    const formik = useFormik({
      initialValues: {
        first_name: '',
        last_name: '',
        company_name: '',
        country: Countries[0].value,
        ward: '',
        district: '',
        province: '',  
      },
      validationSchema: formSchema,
      onSubmit: (value, { setSubmitting }) => {
        console.log(value)
      },
    });
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    useEffect(() => {
      if (!_.isEmpty(touched))
        onError?.(errors);
    }, [errors])

    useEffect(() => {
      onValueChange?.(values);
    }, [values])

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
            Expédier à une adresse différente ?
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
                        Prénom <span className="text-red-500 text-[20px] ">*</span>
                      </label>
                      <input
                        {...formik.getFieldProps('first_name')}
                        type="text"
                        id="first_name"
                        className={`px-4 py-3 border ${errors.first_name ? 'border-red-700' : 'border-gray-300'} text-black`}
                      />
                    </div>
                    <div className="flex flex-col ml-6">
                      <label className="font-semibold">
                        Nom <span className="text-red-500 text-[20px] ">*</span>
                      </label>
                      <input
                        {...formik.getFieldProps('last_name')}
                        type="text"
                        id="last_name"
                        className={`px-4 py-3 border ${errors.last_name ? 'border-red-700' : 'border-gray-300'} text-black`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Nom de l’entreprise (facultatif)</label>
                    <input
                      {...formik.getFieldProps('company_name')}
                      type="text"
                      id="company_name"
                      className="px-4 py-3 border border-gray-300 text-black"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">
                      Pays/région <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <select data-te-select-init data-te-select-filter="true"
                      {...formik.getFieldProps('country')}
                      id="country"
                      className={`px-4 py-3 border ${errors.country ? 'border-red-700' : 'border-gray-300'} text-black`}
                      onChange={(event) => {
                        formik.setFieldValue('country', event.target.value);
                      }}
                    >
                      {
                        Countries?.map((item: any, index: number) => (
                          <option key={index} value="{item?.value}">{item?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">
                      Numéro et nom de rue <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <input
                      {...formik.getFieldProps('ward')}
                      type="text"
                      id="ward"
                      className={`px-4 py-3 border ${errors.ward ? 'border-red-700' : 'border-gray-300'} text-black`}
                    />
                    <input
                      {...formik.getFieldProps('district')}
                      type="text"
                      id="district"
                      className={`px-4 py-3 mt-4 border ${errors.district ? 'border-red-700' : 'border-gray-300'} text-black`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">
                      Ville <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <input
                      {...formik.getFieldProps('province')}
                      type="text"
                      id="province"
                      className={`px-4 py-3 border ${errors.province ? 'border-red-700' : 'border-gray-300'} text-black`}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div className="flex flex-col">
                <label className="font-semibold">Notes de commande (facultatif)</label>
                <textarea
                  placeholder="Commentaires concervant botre commande, ex: consignes de livraison"
                  required
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
