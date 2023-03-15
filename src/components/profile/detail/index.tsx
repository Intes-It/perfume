import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye, faHeart, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUser from '@hooks/useUser';
import { POST, PUT } from '@utils/fetch';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';

const Detail = () => {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  // const formSchema = yup.object().shape({
  //   confirm_password: yup
  //     .string()
  //     .oneOf([yup.ref('new_password')])
  //     .min(8, 'employee.profile.changePass.error2')
  //     .required('employee.profile.changePass.error1'),
  // });
  const [state, setState] = useState({
    message: '',
    color: '',
    error:false
  });

  const { message, color,error } = state;
  const { user } = useUser();
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      name: '',
      email: '',
      password: '',
      new_password: undefined,
      confirm_password: undefined,
    },
    // validationSchema: formSchema,
    onSubmit: (value) => {
      if (value.new_password === value.confirm_password) {
        let data;
        if (value.new_password)
          data = {
            first_name: value.first_name,
            last_name: value.last_name,
            new_password: value.new_password,
          };
        else {
          data = { first_name: value.first_name, last_name: value.last_name };
        }
        PUT('/api/user/profile', data).then((res) => {
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
        setErrorPass(false);
      } else {
        setErrorPass(true);
      }
    },
  });
  return (
    <div>
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
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3">
          <div className="grid grid-cols-2">
            <div className="flex flex-col mr-6">
              <label className="font-semibold">
                Prénom <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                type="text"
                id="first_name"
                defaultValue={user?.first_name}
                onChange={formik.handleChange}
                className={`px-4 py-3 border  text-black`}
              />
            </div>
            <div className="flex flex-col ml-6">
              <label className="font-semibold">
                Nom <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                defaultValue={user?.last_name}
                onChange={formik.handleChange}
                className={`px-4 py-3 border  text-black`}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Nom affiché <span className="text-red-500 text-[20px] ">*</span>
            </label>
            <input
              defaultValue={user?.name}
              type="text"
              id="name"
              readOnly
              onChange={formik.handleChange}
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              E-mail <span className="text-red-500 text-[20px] ">*</span>
            </label>
            <input
              type="text"
              readOnly
              defaultValue={user?.email}
              id="email"
              onChange={formik.handleChange}
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold">
              Mot de passe actuel (laisser vide pour le conserver)
            </label>
            <div className="relative grid  items-center">
              <FontAwesomeIcon
                className="absolute right-0 mr-2  "
                icon={showOldPass ? faEye : faEyeSlash}
                onClick={() => {
                  setShowOldPass(!showOldPass);
                }}
              />
              {/* <FontAwesomeIcon icon={faEyeSlash}/> */}
              <input
                type={showOldPass ? 'text' : 'password'}
                id="password"
                onChange={formik.handleChange}
                className="px-4 py-3 border border-gray-300 text-black"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Nouveau mot de passe (laisser vide pour conserver l’actuel)
            </label>
            <div className="relative grid  items-center">
              <FontAwesomeIcon
                className="absolute right-0 mr-2"
                icon={showNewPass ? faEye : faEyeSlash}
                onClick={() => {
                  setShowNewPass(!showNewPass);
                }}
              />
              <input
                type={showNewPass ? 'text' : 'password'}
                id="new_password"
                onChange={formik.handleChange}
                className="px-4 py-3 border border-gray-300 text-black"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Confirmer le nouveau mot de passe</label>
            <div className="relative grid  items-center">
              <FontAwesomeIcon
                className="absolute right-0 mr-2  "
                icon={showConfPass ? faEye : faEyeSlash}
                onClick={() => {
                  setShowConfPass(!showConfPass);
                }}
              />
              <input
                type={showConfPass ? 'text' : 'password'}
                id="confirm_password"
                onChange={formik.handleChange}
                className={`px-4 py-3 mt-4 border ${
                  errorPass ? 'border-red-700' : 'border-gray-300'
                } text-black`}
              />
            </div>
          </div>
          <button type="submit" className="w-[250px] p-3 rounded-md bg-[#603813] ">
            <div className="text-[15px]  text-white">Enregister les modifications</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Detail;
