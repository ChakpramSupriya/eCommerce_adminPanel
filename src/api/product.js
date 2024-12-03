import { Axios } from "@/lib/axiosInstance";

export async function fetchProducts() {
  const response = await Axios.get("/product/allproduct");
  return response.data;
}

export async function updateProduct(id, formData) {
  const response = await Axios.put(`/product/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response?.data);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await Axios.delete(`/product/delete/${id}`);
  console.log(response?.data);
  return response.data;
}
