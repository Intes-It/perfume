import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
const pendingRequests: any[] = [];
const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: "http://171.244.64.245:8010",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    try {
      const currentTime = Date.now();
      const decoded = token && jwtDecode(token?.toString());
      const expiry = decoded && decoded?.exp;
      if (expiry && expiry < currentTime) {
        config.headers["Authorization"] = "Bearer " + token;
      } else config.headers["Authorization"] = "No auth";
    } catch (error) {
      config.headers["Authorization"] = "No auth";
    }

    return config;
  },
  (error) => {
    return error;
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const refreshToken = getCookie("refresh_token");
    const messageInvalidTk = "Token is invalid or expired";

    if (
      err?.response?.status === 401 &&
      pendingRequests?.length < 1 && // Ensure _retry is initialized
      err?.response?.data?.message === messageInvalidTk
    ) {
      pendingRequests.push(originalConfig);

      try {
        const rs = await instance.post("/api/auth/refresh/", {
          refresh: refreshToken,
        });
        if (rs.status === 200) {
          setCookie("access_token", rs.data?.access);
          setCookie("refresh_token", rs.data?.refresh);
          while (pendingRequests.length > 0) {
            const requestConfig = pendingRequests.shift(); // Remove from queue
            console.log("requestConfig", requestConfig);
            return instance(requestConfig);
          }
        } else {
          deleteCookie("access_token");
          deleteCookie("refresh_token");
        }
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return err.response;
  }
);
export { instance };
