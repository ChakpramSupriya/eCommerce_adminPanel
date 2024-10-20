import { BASE_URL } from "@/constants/apiDetails";

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/category`);
  return response.json();
}
export async function createPost(newPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(newPost),
  });
  return response.json();
}
