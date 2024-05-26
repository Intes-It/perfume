import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
let isRefreshing = false as boolean;
const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: "http://171.244.64.245:8010",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    let token = getCookie("access_token") || "";
    const refreshToken = getCookie("refresh_token");

    let decodeToken = null as any;
    try {
      decodeToken = jwtDecode(token?.toString());
    } catch (error) {
      console.log("error", error);
    }
    const isExpired = decodeToken && Date.now() / 1000 >= decodeToken?.exp;
    //eslint-disable-next-line
    const refreshPromise = new Promise(async (resolve, reject) => {
      if ((isExpired || !decodeToken) && refreshToken && !isRefreshing) {
        isRefreshing = true;

        try {
          const refreshResponse = await axios.post(
            "http://171.244.64.245:8010/api/auth/refresh/",
            {
              refresh: refreshToken,
            }
          );

          if (refreshResponse.status === 200) {
            setCookie("access_token", refreshResponse.data.access);
            setCookie("refresh_token", refreshResponse.data.refresh);
            token = refreshResponse.data.access;
            config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end // config.headers['x-access-token'] = token; // for Node.js Express back-end
            resolve(config); // Resolve the promise with updated config
          } else {
            // Refresh failed, clear tokens and reject the promise
            deleteCookie("access_token");
            deleteCookie("refresh_token");
            reject(new Error("Refresh failed"));
          }
        } catch (error: any) {
          if (error?.response?.status === 401) {
            deleteCookie("access_token");
            deleteCookie("refresh_token");
          }
          reject(error); // Reject the promise with the caught error
        } finally {
          isRefreshing = false;
        }
      } else {
        config.headers["Authorization"] = "Bearer " + token;
        resolve(config);
      }
    });

    // Wait for the refresh promise to complete before returning config
    return await refreshPromise;
  },
  (error) => {
    return Promise.reject(error); // Reject with the original error
  }
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    // Refresh failed or not applicable, return original error
    return Promise.reject(err?.response);
  }
);
export { instance };
