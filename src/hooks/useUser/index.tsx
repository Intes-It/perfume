import { api } from "@utils/apiRoute";
import { GET, POST } from "@utils/fetch";
import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useUser = () => {
  const queryClient = useQueryClient();
  const csrfToken = getCookie("csrftoken");

  const user = csrfToken ? useQuery("get-profile", getProfile) : { data: null };
  //fetch data
  async function getProfile() {
    const res = await GET(api.getProfile);
    return res.data;
  }

  async function login(data: any) {
    return await POST(api.login, data);
  }

  async function register(data: any) {
    return await POST(api.register, data);
  }

  const loginAccount = useMutation("login", login);
  const registerAccount = useMutation("register", register, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-profile");
    },
  });

  return {
    user: user.data,
    isAuthenticated: Boolean(user?.data?.id),
    loginAccount: loginAccount.mutateAsync,
    registerAccount: registerAccount.mutateAsync,
  };
};

export default useUser;
