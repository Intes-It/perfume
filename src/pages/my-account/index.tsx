import { Container } from "@components/container";
import Login from "@components/login";
import Profile from "@components/profile";
import Register from "@components/register";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "@hooks/useUser";
import { clearCart } from "@redux/slices/cart";
import { ExProduct } from "@types";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyAccount = () => {
  const { loginAccount, registerAccount, isAuthenticated, isUserLoading } =
    useUser();

  const router = useRouter();
  const previousPath = router.query;

  const [state, setState] = useState({
    error: false,
    message: "",
    color: "",
  });
  const products = useSelector(
    (state: any) => state?.cart?.products
  ) as ExProduct[];

  const { error, message, color } = state;
  const dispatch = useDispatch();
  const onLogin = async (data: any) => {
    const res = await loginAccount(data);
    if (res?.status === 200) {
      setCookie("access_token", res.data?.access);
      setCookie("refresh_token", res.data?.refresh);
      if (products !== null) {
        dispatch(clearCart());
      }
      if (previousPath?.before) {
        router.push(previousPath?.before.toString());
      } else window.location.replace("/");
    } else {
      setState((o) => ({
        ...o,
        error: true,
        color: "#ed2805",
        message: "Incorrect authentication credentials.",
      }));
    }
  };

  //  getServerSideProps();
  const onRegister = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
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

    const res = await registerAccount(data);
    const loginData = res?.config?.data && JSON.parse(res?.config?.data);
    const mail = loginData?.email;
    const password = loginData?.password;
    if (res?.status === 200 || res.status === 201) {
      onLogin({
        email: mail,
        password: password,
      });

      return;
    }
    if (res?.data?.detail?.email) {
      setState((o) => ({
        ...o,
        error: true,
        message: "Email already exists.",
        color: "#ed2805",
      }));
    } else {
      setState((o) => ({
        ...o,
        error: true,
        message: "Something went wrong.",
        color: "#06e318",
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
          <span
            style={{
              color: color,
            }}
          >
            {message}
          </span>
        </div>
      ) : (
        <></>
      )}
      {isUserLoading ? (
        <div></div>
      ) : isAuthenticated ? (
        <div>
          <Profile />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around mt-10 md:flex-row md:items-start">
          <div className="w-[95vw] mb-20 md:w-[45vw]">
            <h3 className="my-4 text-[26px]  text-[#26222f]">Login</h3>
            <Login submit={onLogin} />
          </div>
          <div className="w-[95vw] mb-20 md:w-[45vw]">
            <h3 className="my-4 text-[26px]  text-[#26222f]">Sign up</h3>
            <Register submit={onRegister} error={error} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default MyAccount;
