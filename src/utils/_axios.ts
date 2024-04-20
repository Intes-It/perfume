import axios from "axios";
const instance = axios.create({
  baseURL:'https://parfumnhapkhau.com',
});

instance.defaults.xsrfHeaderName = "X-CSRFToken";
instance.defaults.xsrfCookieName = "csrftoken";
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
instance.defaults.headers.common['Access-Control-Allow-Methods'] = '*'
instance.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
instance.defaults.headers.common['Access-Control-Allow-Credentials'] = '*'


export { instance };
