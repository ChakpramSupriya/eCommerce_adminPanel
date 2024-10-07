import { BASE_URL } from "@/constants/apiDetails";
export const createCategory = async (newCategory) => {
  const response = await fetch(`${BASE_URL}/category/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
};
