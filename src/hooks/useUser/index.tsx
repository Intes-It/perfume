import { api } from "@utils/apiRoute";
import { GET, POST } from "@utils/fetch";
import { deleteCookie, getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useUser = () => {
  const queryClient = useQueryClient();
  const csrfToken = getCookie("csrftoken");

  const user = csrfToken ? useQuery("get-profile", getProfile) : { data: null };
  //fetch data
  async function getProfile() {
    try {
      if (!csrfToken) return;
      const res = await GET(api.getProfile);
      if (res.status === 403 && csrfToken) deleteCookie("csrftoken");

      return res.data;
    } catch (error: any) {
      if (error.status === 403 && csrfToken) {
        deleteCookie("csrftoken");
      }
    }
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
