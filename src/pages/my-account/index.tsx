import { Container } from '@components/container';
import Register from '@components/register';
import Login from '@components/login';
import useUser from '@hooks/useUser';
import Profile from '@components/profile';

const MyAccount = () => {
  const { user, loginAccount, registerAccount, isAuthenticated } = useUser();

  const onLogin = async (data: any) => {
    const res = await loginAccount(data);
    if (res?.status === 200) {
      window.location.reload();
    }
  };

  const onRegister = async (data: any) => {
     await registerAccount(data);
  };

  return (
    <Container>
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
