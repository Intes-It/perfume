import { Countries } from '@definitions/constants';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUser from '@hooks/useUser';
import { PUT } from '@utils/fetch';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

type FacturationProps = {
  onBack: () => void;
};

const Facturation: React.FC<FacturationProps> = ({ onBack }) => {
  const { user } = useUser();
  const [state, setState] = useState({
    error: false,
    message: '',
    color: '',
  });

  const { error, message, color } = state;

  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      company_name: user?.company_name,
      country: user?.country,
      wards: user?.district,
      district: user?.district,
      province: user?.province,
      zip_code: user?.zip_code,
      phone: user?.phone,
    },
    // initialErrors: {
    //   ward: 'required',
    //   district: 'required',
    //   zip_code: 'required',
    //   province: 'required',
    // },
    onSubmit: (value) => {
      console.log(value);
      PUT('/api/user/profile', value).then((res) => {
        if (res?.status === 200) {
          setState((o) => ({
            ...o,
            error: true,
            message: 'Mise à jour réussie',
            color: '#06e318',
          }));
        } else {
          console.log(res.status);
          setState((o) => ({
            ...o,
            error: true,
            message: "Quelque chose s'est mal passé",
            color: '#ed2805',
          }));
        }
      });
    },
  });
  const { errors } = formik;

  return (
    <div className="">
      {error ? (
        <div
          style={{
            borderColor: `${color}`,
          }}
          className={`mt-4 border-t-[3px]  bg-[#f6f7f6] p-5`}>
          <FontAwesomeIcon icon={faWindowMaximize} className="mr-3" fontSize={'1.2rem'} />
          <span>{message}</span>
        </div>
      ) : (
        <div></div>
      )}
      <button onClick={onBack} className="w-[100px] mt-2 p-3 mb-3 rounded-md border border-black">
        Back
      </button>
      {/* form */}
      <div>
        <span className="text-[#26222f] text-[32px] font-semibold">Adresse de facturation</span>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-3">
            <div className="grid grid-cols-2">
              <div className="flex flex-col mr-6">
                <label className="font-semibold">
                  Prénom <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  onChange={formik.handleChange}
                  required
                  value={user?.first_name}
                  type="text"
                  defaultValue={user?.first_name}
                  id="first_name"
                  className={`px-4 py-3 border border-gray-300'
                  } text-black`}
                />
              </div>
              <div className="flex flex-col ml-6">
                <label className="font-semibold">
                  Nom <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  onChange={formik.handleChange}
                  defaultValue={user?.last_name}
                  type="text"
                  id="last_name"
                  className={`px-4 py-3 border  'border-gray-300'
                  } text-black`}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Nom de l’entreprise (facultatif)</label>
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
                Pays/région <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <select
                data-te-select-init
                data-te-select-filter="true"
                onChange={formik.handleChange}
                id="country"
                className={`px-4 py-3 border ${
                  errors.country ? 'border-red-700' : 'border-gray-300'
                } text-black`}>
                {Countries?.map((item: any, index: number) => (
                  <option key={index} value={item?.value}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Numéro et nom de rue <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                defaultValue={user?.wards}
                id="wards"
                className={`px-4 py-3 border  'border-gray-300'
                } text-black`}
              />
              <input
                onChange={formik.handleChange}
                type="text"
                id="district"
                defaultValue={user?.district}
                className={`px-4 py-3 mt-4 border ${
                  errors.district ? 'border-red-700' : 'border-gray-300'
                } text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Ville <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                defaultValue={user?.province}
                id="province"
                className={`px-4 py-3 border ${
                  errors.province ? 'border-red-700' : 'border-gray-300'
                } text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Code postal <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="number"
                id="zip_code"
                defaultValue={user?.zip_code}
                className={`px-4 py-3 mt-4 border ${
                  errors.zip_code ? 'border-red-700' : 'border-gray-300'
                } text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                Téléphone <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                defaultValue={user?.phone}
                id="phone"
                className={`px-4 py-3 mt-4 border border-gray-300
                 text-black`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">
                E-mail <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                readOnly
                defaultValue={user?.email}
                type="email"
                id="id"
                className={`px-4 py-3 mt-4 border  'border-gray-300'
                } text-black`}
              />
            </div>
            <button type="submit" className="w-[200px] p-3 mt-3 rounded-md bg-[#603813] ">
              <div className="text-[15px]  text-white">Sauvegarder l'adresse</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Facturation;
