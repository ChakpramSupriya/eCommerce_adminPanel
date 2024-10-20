import { BASE_URL } from "@/constants/apiDetails";
export const createSubCategory = async (subCategoryName) => {
  const categoryId = JSON.parse(localStorage.getItem("cId"));
  const response = await fetch(
    `${BASE_URL}/subCategory/${categoryId}/createSubCategory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subCategoryName),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create subcategory");
  }

  return response.json();
};

export async function fetchSubCategories(categoryId) {
  const response = await fetch(
    `${BASE_URL}/subCategory/${categoryId}/getSubCategory`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch subcategories");
  }
  return response.json();
}
