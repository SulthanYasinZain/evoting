"use server";

import { cookies } from "next/headers";

export default async function EditCandidate(
  _prevState: any,
  formData: FormData
) {
  console.log("AddNewCandidate action started");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Token:", token ? "Token found" : "Token not found");
  console.log(token);

  const candidateId = formData.get("candidate_id") as string;
  const number = formData.get("number") as string;
  const name = formData.get("name") as string;
  const vision = formData.get("vision") as string;
  const mission = formData.get("mission") as string;
  const image = formData.get("image_url");

  console.log("Form Data Received:");
  console.log("  election_id:", candidateId);
  console.log("  number:", number);
  console.log("  name:", name);
  console.log("  vision:", vision);
  console.log("  mission:", mission);
  console.log(
    "  image:",
    image instanceof File
      ? `File: ${image.name}, Size: ${image.size}`
      : "Not a file or missing"
  );

  if (!image || !(image instanceof File)) {
    console.error("Image validation failed");
    return { success: false, message: "Image file is required" };
  }

  const apiFormData = new FormData();
  apiFormData.append("number", number);
  apiFormData.append("name", name);
  apiFormData.append("vision", vision);
  apiFormData.append("mission", mission);
  apiFormData.append("image_url", image); // This must be a File object

  console.log("Prepared FormData for API:");
  for (let [key, value] of apiFormData.entries()) {
    console.log(
      `  ${key}:`,
      value instanceof File ? `File: ${value.name}` : value
    );
  }

  try {
    console.log(
      `Sending request to ${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}`
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          // DON'T set Content-Type manually when using FormData
        },
        body: apiFormData,
      }
    );

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error("API Error Response:", errorData);
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
        errorData = { message: response.statusText };
      }
      return {
        success: false,
        message: `Failed to add candidate: ${
          errorData.message || response.statusText
        }`,
      };
    }

    console.log("Candidate added successfully");
    return { success: true, message: "Candidate added successfully" };
  } catch (error) {
    console.error("Fetch Error:", error);
    return {
      success: false,
      message: `Unexpected error: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
