import axios from "axios";
import { deleteCookie } from "cookies-next";
const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
        const pastDate = new Date(0);

        // Set the cookie name, value as empty string, and expired date
        document.cookie =
          "csrftoken" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        console.log("document.cookie ", document.cookie);
      }
      // if(error?.response)
      // Re-throw unhandled errors
      return Promise.reject(error);
    }
  }
);
export { instance };
