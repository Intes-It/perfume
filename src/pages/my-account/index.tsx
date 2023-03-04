import { Container } from '@components/container';
import { useState, useEffect } from 'react';
import Register from '@components/register';
import Login from '@components/login';
import useUser from '@hooks/useUser';  
import { useQuery, useQueryClient } from 'react-query';

const MyAccount = () => {
  const { user, loginAccount, registerAccount, isAuthenticated } = useUser();
  const {isLoading} = registerAccount;
  const onLogin = async (data: any) => {
    await loginAccount.mutateAsync(data);
    console.log(isAuthenticated);
  };

  const onRegister = async (data: any) => {
    refetch();
    // console.log(res);
  };
  
  const { data, refetch } = useQuery(
    "repoData",
    () => fetch('https://official-joke-api.appspot.com/jokes/programming/random').then((res) => console.log(res)),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  
  return (
    <Container>
      <div className="flex justify-around items-center flex-col mt-10 md:flex-row md:items-start">
        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">Connexion</h3>
          {isAuthenticated ? <div>Profile</div> : <Login submit={onLogin} />}
        </div>

        <div className="w-[95vw] mb-20 md:w-[45vw]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">S’enregistrer</h3>
          {isAuthenticated ? <div>Profile</div> : <Register submit={onRegister} />}
        </div>
      </div>
    </Container>
  );
};

export default MyAccount;
