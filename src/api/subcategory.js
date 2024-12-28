import { Axios } from "@/lib/axiosInstance";

export async function fetchSubCategories(categoryId) {
  const response = await Axios.get(`/subCategory/${categoryId}/getSubCategory`);
  return response.data;
}
// export const fetchSubCategories = async (categoryId) => {
//   const response = await fetch(`/subCategory/${categoryId}/getSubCategory`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch subcategories");
//   }
//   const data = await response.json();
//   return data;

// };

export async function createSubCategory({ subCategoryName, category }) {
  try {
    const response = await Axios.post(
      "/subCategory/createSubCategory",
      {
        subCategoryName,
        category,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating subcategory:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function updateSubCategory(id, updatedData) {
  const response = await Axios.put(`/subCategory/update/${id}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response?.data);
  return response.data;
}

export async function deleteSubCategory(id) {
  const response = await Axios.delete(`/subCategory/delete/${id}`);
  console.log(response?.data);
  return response.data;
}
