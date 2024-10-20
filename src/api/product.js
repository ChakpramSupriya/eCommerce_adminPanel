import { BASE_URL } from "@/constants/apiDetails";

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/product/allproduct`);
  return response.json();
}
