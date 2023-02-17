import { Container } from '@components/container';
import * as React from 'react';


import Register from '@components/register';
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
