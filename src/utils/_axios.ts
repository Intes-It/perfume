import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.defaults.xsrfHeaderName = "X-CSRFToken";
instance.defaults.xsrfCookieName = "csrftoken";

export { instance };
