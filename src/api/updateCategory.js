import { BASE_URL } from "@/constants/apiDetails";

export const updateCategory = async ({ categoryId, updatedCategoryData }) => {
  console.log("Category ID:", categoryId);

  const response = await fetch(`${BASE_URL}/category/update/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCategoryData),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
};
