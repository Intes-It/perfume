import { Container } from "@components/container";
import Register from "@components/register";
import Login from "@components/login";
import useUser from "@hooks/useUser";
import Profile from "@components/profile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import useCart from "@hooks/useCart";
import { useSelector } from "react-redux";
import { ExProduct } from "@types";
const MyAccount = () => {
  const { user, loginAccount, registerAccount, isAuthenticated } = useUser();

  const [state, setState] = useState({
    error: false,
    message: "",
    color: "",
  });

  const { error, message, color } = state;

  const onLogin = async (data: any) => {
    const res = await loginAccount(data).catch((res) => {
      console.log(res);
    });
    if (res?.status === 200) {
      window.location.reload();
    } else {
      setState((o) => ({
        ...o,
        error: true,
        color: '#ed2805',
        message: "Quelque chose s'est mal passé",
      }));
    }
  };

  const onRegister = async (data: any) => {
    const res = await registerAccount(data);
    if (res?.status === 200) {
      if (res?.data?.message === "Email exists") {
        setState((o) => ({
          ...o,
          error: true,
          message: "Un compte est déjà enregistré avec votre adresse e-mail",
          color: "#ed2805",
        }));
      } else {
        setState((o) => ({
          ...o,
          error: true,
          message: "L'enregistrement fut un succès",
          color: "#06e318",
        }));
      }
    } else {
      console.log(res.status);
      setState((o) => ({
        ...o,
        error: true,
        message: "Quelque chose s'est mal passé",
        color: "#ed2805",
      }));
    }
  };
  //tests
  return (
    <Container>
      {error ? (
        <div
          style={{
            borderColor: `${color}`,
          }}
          className={`mt-4 border-t-[3px]  bg-[#f6f7f6] p-5`}
        >
          <FontAwesomeIcon
            icon={faWindowMaximize}
            className="mr-3"
            fontSize={"1.2rem"}
          />
          <span>{message}</span>
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
