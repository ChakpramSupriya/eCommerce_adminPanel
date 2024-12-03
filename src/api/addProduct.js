import { Axios } from "@/lib/axiosInstance";

export async function fetchCategories() {
  const response = await Axios.get("/category");
  return response.data;
}
export async function createProductPost(formData) {
  const response = await Axios.post("/product/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // Use `.data` instead of `.json()` for Axios
  console.log(response?.data);
  return response.data;
}
