import { BASE_URL } from "@/constants/apiDetails";

export const deleteCategory = async (categoryId) => {
  const response = await fetch(`${BASE_URL}/category/delete/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }

  return response.json();
};
