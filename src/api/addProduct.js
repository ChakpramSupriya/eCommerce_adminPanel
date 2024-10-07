import { AxiosInstance } from "@/lib/axiosInstance";

export const createProduct = (formData) =>
  AxiosInstance.post("/product/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
