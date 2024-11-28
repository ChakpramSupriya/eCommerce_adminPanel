import { Axios } from "@/lib/axiosInstance";

export async function fetchCollection() {
  const response = await Axios.get("/collection/allcollection");
  return response.data;
}
