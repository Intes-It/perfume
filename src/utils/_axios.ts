import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.defaults.xsrfHeaderName = "X-CSRFToken";
instance.defaults.xsrfCookieName = "csrftoken";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
instance.defaults.headers.common["Access-Control-Allow-Methods"] = "*";
instance.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
instance.defaults.headers.common["Access-Control-Allow-Credentials"] = "*";

export { instance };
