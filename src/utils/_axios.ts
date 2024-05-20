import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
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
let _retry = false;

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const refreshToken = getCookie("refresh_token");
    // Access Token was expired
    if (err.response.status === 401 && !_retry) {
      _retry = true;

      try {
        const rs = await instance.post("/api/auth/refresh/", {
          refresh: refreshToken,
        });
        if (rs.status === 200) {
          setCookie("access_token", rs.data?.access);
          setCookie("refresh_token", rs.data?.refresh);
          _retry = false;
          return instance(originalConfig);
        }
        if (rs.status === 401) {
          deleteCookie("access_token");
          deleteCookie("refresh_token");

          return; // No further retries needed
        }
      } catch (_error) {
        // Clear _retry flag even on errors during refresh
        return Promise.reject(_error);
      } finally {
        _retry = false;
      }
    }
    _retry = false;
    return err.response;
  }
);

export { instance };
