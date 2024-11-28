import { Axios } from "@/lib/axiosInstance";

export async function fetchCarousel() {
  const response = await Axios.get("/carousel");
  return response.data;
}

export async function createCarouselPost(formData) {
  const response = await Axios.post("/carousel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // Use `.data` instead of `.json()` for Axios
  console.log(response?.data);
  return response.data;
}

export async function updateCarousel(id, formData) {
  const response = await Axios.put(`/carousel/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response?.data);
  return response.data;
}

export async function deleteCarousel(id) {
  const response = await Axios.delete(`/carousel/delete/${id}`);
  console.log(response?.data);
  return response.data;
}
