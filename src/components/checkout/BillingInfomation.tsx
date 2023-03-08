
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import _ from 'lodash';

type BillingInfomationProps = {
  onError?: (errors: any) => void;
  onValueChange?: (values: any) => void;
};

const BillingInfomation: React.FC<BillingInfomationProps> = ({ onError, onValueChange }) => {
  const formSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    // country: Yup.string().required(),
    street: Yup.string().required(),
    building: Yup.string().required(),
    zip_code: Yup.string().required(),
    city: Yup.string().required(),
    phone: Yup.number().required(),
    email: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      company_name: '',
      country: '',
      street: '',
      building: '',
      city: '',
      zip_code: '',
      phone: '',
      email: '',
      subscribeNewLetter: true,
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
    <div className="">
      <button className=" grid bg-[#33ddb3] hover:bg-[#43edc3] w-full max-h-[64px] min-h-[32px] rounded-md">
        <div className="flex m-auto p-2">
          <div className="mr-2">Payer avec</div>
          <span role="presentation">
            <svg
              className="max-h-[41px] min-h-[18px] mt-1"
              focusable="false"
              viewBox="0 0 250 113.3"
              fill="none">
              <path
                fill="#1D3944"
                d="M39.8 1.7C41.5.6 43.4 0 45.5 0c2.7 0 5.3 1.1 7.2 3 1.9 1.9 3 4.5 3 7.2 0 2-.6 4-1.7 5.7-1.1 1.7-2.7 3-4.6 3.8-1.9.8-3.9 1-5.9.6-2-.4-3.8-1.4-5.2-2.8-1.4-1.4-2.4-3.3-2.8-5.2-.4-2-.2-4 .6-5.9.7-2 2-3.5 3.7-4.7zM0 1.1h18.3v110.6H0V1.1zM247.2 32.7c-6.3 13.6-13.8 26.6-22.3 38.9l25.1 40h-21.6L213 87c-15.5 17.7-30.8 26.3-45.6 26.3-18 0-25.4-12.9-25.4-27.5V75.3c0-19.3-2-24.8-8.6-23.9-12.5 1.7-31.6 30.2-44 60.3H72.3v-79h18.3v39.5c10.4-17.6 20-32.7 35.4-38.5 8.9-3.4 16.5-1.9 20.4-.2 14.2 6.3 14.2 21.5 14 42v8.7c0 7.4 2.1 10.7 7.1 11.2 3 .3 6-.4 8.6-1.9V1.1h18.3v79.2s15.9-14.5 32.6-47.5h20.2zM54.6 32.8H36.3v78.9h18.3V32.8z"></path>
            </svg>
          </span>
          <svg focusable="false" viewBox="0 0 25 25" fill="none" className="h-[32px] ml-2">
            <path
              d="M14.5247 0.219442C14.2317 -0.0733252 13.7568 -0.0731212 13.4641 0.219898C13.1713 0.512917 13.1715 0.98779 13.4645 1.28056L18.5 6.5L19 7L18.5 7.75C18 8.5 13.4645 12.7194 13.4645 12.7194C13.1715 13.0122 13.1713 13.4871 13.4641 13.7801C13.7568 14.0731 14.2317 14.0733 14.5247 13.7806L20.7801 7.53056C20.9209 7.38989 21 7.19902 21 7C21 6.80098 20.9209 6.61011 20.7801 6.46944L14.5247 0.219442Z"
              fill="#1D3944"></path>
            <path d="M14 4L4 4" stroke="#1D3944" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M14 4V1" stroke="#1D3944" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M14 13V10" stroke="#1D3944" strokeWidth="1.5" strokeLinecap="round"></path>
            <path
              d="M4 9.25C3.58579 9.25 3.25 9.58579 3.25 10C3.25 10.4142 3.58579 10.75 4 10.75V9.25ZM14 9.25H4V10.75H14V9.25Z"
              fill="#1D3944"></path>
            <path
              d="M1.00007 6.25C0.585853 6.24996 0.250037 6.58572 0.25 6.99993C0.249963 7.41415 0.58572 7.74996 0.999934 7.75L1.00007 6.25ZM14.0001 6.25115L1.00007 6.25L0.999934 7.75L13.9999 7.75115L14.0001 6.25115Z"
              fill="#1D3944"></path>
          </svg>
        </div>
      </button>

      <div className="text-center mt-6 mb-2">
        <span>— OU —</span>
      </div>

      {/* form */}
      <div>
        <span className="text-[#26222f] text-[32px] font-semibold">Détails de facturation</span>
        <form onInvalidCapture={() => {
          console.log('re')
        }} >
          <div className="grid gap-3">
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
              >
                <option value="1">Vietnam</option>
                <option value="2">France</option>
                <option value="3">Chinese</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Numéro et nom de rue <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps('street')}
                type="text"
                id="street"
                className={`px-4 py-3 border ${errors.street ? 'border-red-700' : 'border-gray-300'} text-black`}
              />
              <input
                {...formik.getFieldProps('building')}
                type="text"
                id="building"
                className={`px-4 py-3 mt-4 border ${errors.building ? 'border-red-700' : 'border-gray-300'} text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Ville <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps('city')}
                type="text"
                id="city"
                className={`px-4 py-3 border ${errors.city ? 'border-red-700' : 'border-gray-300'} text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Code postal <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps('zip_code')}
                type="text"
                id="zip_code"
                className={`px-4 py-3 mt-4 border ${errors.zip_code ? 'border-red-700' : 'border-gray-300'} text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Téléphone <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps('phone')}
                type="text"
                id="phone"
                className={`px-4 py-3 mt-4 border ${errors.phone ? 'border-red-700' : 'border-gray-300'} text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                E-mail <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                {...formik.getFieldProps('email')}
                type="email"
                id="id"
                className={`px-4 py-3 mt-4 border ${errors.email ? 'border-red-700' : 'border-gray-300'} text-black`}
              />
            </div>
            <div className="flex justify-between font-semibold">
              <div className="flex items-center space-x-2">
                <input type="checkbox"
                  defaultChecked={true}
                  onChange={(e) => { console.log(e) }}
                  id="remember" className="w-4 h-4 " />
                <label>Subscribe to our newsletter</label>
              </div>
            </div>
            <div className="flex justify-between font-semibold">
              <div className="flex items-center space-x-2">
                <input type="checkbox"
                  defaultChecked={false}
                  onChange={(e) => { console.log(e) }}
                  id="remember" className="w-4 h-4 " />
                <label>Créer un compte ?</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingInfomation;
