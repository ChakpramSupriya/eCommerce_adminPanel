import axios from "axios";
export const Url = "https://e-commerce-ten-rust.vercel.app";
// export const Url = "https://qfqhhctz-5000.inc1.devtunnels.ms/";
// export const Url = "https://eyongkart.com/api";
export const Axios = axios.create({
  baseURL: Url,
});
