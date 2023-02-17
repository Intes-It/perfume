import { Container } from '@components/container';
import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';
import { Routes } from '@definitions/constants';
import { useForm } from 'react-hook-form';
import { POST } from '@utils/fetch';
import { api } from '@utils/apiRoute';
import Register from '@components/login';
import Login from '@components/login';

const MyAccount = () => {

  return (
    <Container>
      <div className="flex justify-around items-center flex-col mt-10 md:flex-row md:items-start">
        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">Connexion</h3>
          <Login />
        </div>

        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">S’enregistrer</h3>
          <Register />
        </div>
      </div>
    </Container>
  );
};

export default MyAccount;
