import { BASE_URL } from "@/constants/apiDetails";
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
