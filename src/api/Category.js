import { Axios } from "@/lib/axiosInstance";

export async function fetchCategory() {
  const response = await Axios.get("/category");
  return response.data;
}

export async function createCategoryPost(formData) {
  const response = await Axios.post("/category/create", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response?.data);
  return response.data;
}

export async function updateCategory(id, formData) {
  const response = await Axios.put(`/category/update/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response?.data);
  return response.data;
}

export async function deleteCategory(id) {
  const response = await Axios.delete(`/category/delete/${id}`);
  console.log(response?.data);
  return response.data;
}
