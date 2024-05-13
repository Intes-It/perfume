import axios from "axios";
import { deleteCookie } from "cookies-next";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.defaults.xsrfHeaderName = "X-CSRFToken";
instance.defaults.xsrfCookieName = "csrftoken";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
instance.defaults.headers.common["Access-Control-Allow-Methods"] = "*";
instance.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
instance.defaults.headers.common["Access-Control-Allow-Credentials"] = "*";

// Intercept errors and silently handle them (for specific cases)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      // Handle specific 400 errors silently (e.g., validation errors)
      console.error("API error (400):", error.response.data);
      return Promise.resolve({ data: error.response.data }); // Provide a generic response
    } else {
      {
        deleteCookie("csrftoken");
      }
      // if(error?.response)
      // Re-throw unhandled errors

      return Promise.reject(error);
    }
  }
);
export { instance };
