import { api } from "@utils/apiRoute";
import { GET, POST } from "@utils/fetch";
import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useUser = () => {
  const queryClient = useQueryClient();

  const user = useQuery("get-profile", getProfile);
  //fetch data
  async function getProfile() {
    const access_token = getCookie("access_token");
    if (!access_token) return;

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
    isUserLoading: user.isLoading,
    loginAccount: loginAccount.mutateAsync,
    registerAccount: registerAccount.mutateAsync,
  };
};

export default useUser;
