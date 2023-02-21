import { Container } from '@components/container';
import { useState, useEffect } from 'react';
import Register from '@components/register';
import Login from '@components/login';
import useUser from '@hooks/useUser';

const MyAccount = () => {
  const { user, authenticate, isAuthenticated } = useUser();
  const onLogin = (data: any) => {
    authenticate(data);
    console.log(isAuthenticated);
  };

  return (
    <Container>
      <div className="flex justify-around items-center flex-col mt-10 md:flex-row md:items-start">
        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">Connexion</h3>
          {isAuthenticated ? <div>Profile</div> : <Login submit={onLogin} />}
        </div>

        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">S’enregistrer</h3>
          {isAuthenticated ? <div>Profile</div> : <Register />}
        </div>
      </div>
    </Container>
  );
};

export default MyAccount;
