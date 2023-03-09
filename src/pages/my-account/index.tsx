import { Container } from '@components/container';
import Register from '@components/register';
import Login from '@components/login';
import useUser from '@hooks/useUser';
import Profile from '@components/profile';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';

const MyAccount = () => {
  const { user, loginAccount, registerAccount, isAuthenticated } = useUser();

  const [error, setError] = useState(false);

  const onLogin = async (data: any) => {
    const res = await loginAccount(data);
    if (res?.status === 200) {
      window.location.reload();
    } else {
      setError(true);
    }
  };

  const onRegister = async (data: any) => {
    await registerAccount(data);
  };

  return (
    <Container>
      {error ? (
        <div className="mt-4 border-t-[3px] border-[#ed2805] bg-[#F7F6F7] p-5">
          <FontAwesomeIcon icon={faWindowMaximize} className="mr-3" fontSize={'1.2rem'} />
          <span>Something Wrong</span>
        </div>
      ) : (
        <></>
      )}
      {isAuthenticated ? (
        <div>
          <Profile />
        </div>
      ) : (
        <div className="flex justify-around items-center flex-col mt-10 md:flex-row md:items-start">
          <div className="w-[95vw] mb-20 md:w-[45vw]">
            <h3 className="my-4 text-[26px]  text-[#26222f]">Connexion</h3>
            <Login submit={onLogin} />
          </div>
          <div className="w-[95vw] mb-20 md:w-[45vw]">
            <h3 className="my-4 text-[26px]  text-[#26222f]">S’enregistrer</h3>
            <Register submit={onRegister} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default MyAccount;
