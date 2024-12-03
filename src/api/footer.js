import { Axios } from "@/lib/axiosInstance";

export async function fetchFooter() {
  const response = await Axios.get("/footer/getfooter");
  return response.data;
}

export async function createFooter(formData) {
  const response = await Axios.post("/footer/addfooter", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response?.data);
  return response.data;
}

export async function updateFooter(id, formData) {
  const response = await Axios.put(`/footer/update/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response?.data);
  return response.data;
}

export async function deleteFooter(id) {
  const response = await Axios.delete(`/footer/delete/${id}`);
  console.log(response?.data);
  return response.data;
}
