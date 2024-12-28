import { Axios } from "@/lib/axiosInstance";

//footer header
export async function fetchFooterHeader() {
  const response = await Axios.get("/footersub/getfootersub");
  return response.data;
}

export async function createFooterHeader({ name, footerSubHeading }) {
  try {
    const response = await Axios.post(
      "/footersub/addfootersub",
      {
        name,
        footerSubHeading,
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
      "Error creating footerheader:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function updateFooterHeader(id, updatedData) {
  const response = await Axios.put(
    `/footersub/updatefootersub/${id}`,
    updatedData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response?.data);
  return response.data;
}

export async function deleteFooterHeader(id) {
  const response = await Axios.delete(`/footersub/deletefootersub/${id}`);
  console.log(response?.data);
  return response.data;
}

//footer link
export async function fetchFooterLink(footerSubHeadingId) {
  const response = await Axios.get(
    `/footerlink/${footerSubHeadingId}/getfooterlink`
  );
  return response.data;
}

export async function createFooterLink({ name, footerSubHeading }) {
  try {
    const response = await Axios.post(
      "/footerlink/addfooterlink",
      {
        name,
        footerSubHeading,
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
      "Error creating footerlink:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function updateFooterLink(id, updatedData) {
  const response = await Axios.put(
    `/footerlink/updatefooterlink/${id}`,
    updatedData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response?.data);
  return response.data;
}

export async function deleteFooterLink(id) {
  const response = await Axios.delete(`/footerlink/deletefooterlink/${id}`);
  console.log(response?.data);
  return response.data;
}
