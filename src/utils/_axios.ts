import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
const pendingRequests: any[] = [];
const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      // config.headers['x-access-token'] = token; // for Node.js Express back-end
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
        originalConfig._retry = false; // Clear _retry on any error
        return Promise.reject(_error);
      } finally {
      }
    }
    return err.response;
  }
);
export { instance };
