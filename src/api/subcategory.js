import { BASE_URL } from "@/constants/apiDetails";
// export const createSubCategory = async (subCategoryName) => {
//   const categoryId = JSON.parse(localStorage.getItem("cId"));
//   const response = await fetch(
//     `${BASE_URL}/subCategory/${categoryId}/createSubCategory`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(subCategoryName),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to create subcategory");
//   }

//   return response.json();
// };

// export async function fetchSubCategories(categoryId) {
//   const response = await fetch(
//     `${BASE_URL}/subCategory/${categoryId}/getSubCategory`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch subcategories");
//   }
//   return response.json();
// }

import { Axios } from "@/lib/axiosInstance";

export async function fetchSubCategories(categoryId) {
  const response = await Axios.get(`/subCategory/${categoryId}/getSubCategory`);
  return response.data;
}

export async function createSubCategory({ subCategoryName, categoryId }) {
  try {
    const response = await Axios.post(
      "/subCategory/createSubCategory",
      {
        subCategoryName,
        categoryId,
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

export async function updateSubCategory(id, formData) {
  const response = await Axios.put(`/subcategory/update/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response?.data);
  return response.data;
}

export async function deleteSubCategory(id) {
  const response = await Axios.delete(`/subcategory/delete/${id}`);
  console.log(response?.data);
  return response.data;
}
