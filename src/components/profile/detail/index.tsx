import useUser from '@hooks/useUser';
import { POST, PUT } from '@utils/fetch';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

const Detail = () => {
  const formSchema = yup.object().shape({
    password: yup.string().required(),
    new_password: yup.string().required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('new_password')])
      .min(8, 'employee.profile.changePass.error2')
      .required('employee.profile.changePass.error1'),
  });

  const { user } = useUser();
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      name: '',
      email: '',
      password: '',
      new_password: '',
      confirm_password: '',
    },
    // validationSchema: formSchema,
    onSubmit: (value) => {
      const data = {
        first_name: value.first_name,
        last_name: value.last_name,
        new_password: value.new_password,
      };
      PUT('/api/user/profile', data).then((res) => console.log(res));
      console.log(value);
    },
  });
  return (
    <div>
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
              {...formik.getFieldProps('name')}
              value={user?.name}
              type="text"
              id="name"
              onChange={formik.handleChange}
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              E-mail <span className="text-red-500 text-[20px] ">*</span>
            </label>
            <input
              {...formik.getFieldProps('email')}
              type="text"
              value={user?.email}
              id="email"
              onChange={formik.handleChange}
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Mot de passe actuel (laisser vide pour le conserver)
            </label>
            <input
              {...formik.getFieldProps('password')}
              type="text"
              id="password"
              onChange={formik.handleChange}
              className="px-4 py-3 border  border-gray-300 text-black"
              // className={`px-4 py-3 border ${errors.last_name ? 'border-red-700' : 'border-gray-300'} text-black`}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Nouveau mot de passe (laisser vide pour conserver l’actuel)
            </label>
            <input
              {...formik.getFieldProps('new_password')}
              type="text"
              id="new_password"
              onChange={formik.handleChange}
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Confirmer le nouveau mot de passe</label>
            <input
              {...formik.getFieldProps('confirm_password')}
              type="text"
              id="confirm_password"
              onChange={formik.handleChange}
              className="px-4 py-3 border border-gray-300 text-black"
            />
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
