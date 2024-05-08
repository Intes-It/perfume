import { Container } from "@components/container";
import Login from "@components/login";
import Profile from "@components/profile";
import Register from "@components/register";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "@hooks/useUser";
import { clearCart } from "@redux/slices/cart";
import { ExProduct } from "@types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const MyAccount = () => {
  const { loginAccount, registerAccount, isAuthenticated } = useUser();

  const [state, setState] = useState({
    error: false,
    message: "",
    color: "",
  });
  const products = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];

  const { error, message, color } = state;
  const dispatch = useDispatch();
  const onLogin = async (data: any) => {
    const res = await loginAccount(data).catch((res) => {
      console.log(res);
    });
    if (res?.status === 200) {
      window.location.reload();
      if (products !== null) {
        dispatch(clearCart());
      }
    } else {
      setState((o) => ({
        ...o,
        error: true,
        color: "#ed2805",
        message: "Quelque chose s'est mal passé",
      }));
    }
  };

  const onRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    if (data.name.trim() === "") {
      setState((o) => ({
        ...o,
        error: true,
        message: "Name is required",
        color: "#ed2805",
      }));
      return;
    }

    const isEmailValid =
      /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/.test(
        data.email
      );
    if (!isEmailValid) {
      setState((o) => ({
        ...o,
        error: true,
        message: "Email is not valid",
        color: "#ed2805",
      }));

      return;
    }

    if (data.name.trim() === "") {
      setState((o) => ({
        ...o,
        error: true,
        message: "Name is required",
        color: "#ed2805",
      }));
      return;
    }

    const res = await registerAccount(data);

    const loginData = JSON.parse(res.config.data);
    const mail = loginData?.email;
    const password = loginData.password;
    if (res?.status === 200 || res.status === 201) {
      onLogin({
        email: mail,
        password: password,
      });
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
        <div className="flex flex-col items-center justify-around mt-10 md:flex-row md:items-start">
          <div className="w-[95vw] mb-20 md:w-[45vw]">
            <h3 className="my-4 text-[26px]  text-[#26222f]">Connexion</h3>
            <Login submit={onLogin} />
          </div>
          <div className="w-[95vw] mb-20 md:w-[45vw]">
            <h3 className="my-4 text-[26px]  text-[#26222f]">S’enregistrer</h3>
            <Register submit={onRegister} error={error} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default MyAccount;
