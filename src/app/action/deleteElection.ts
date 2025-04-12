/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export default async function deleteElection(
  prevState: any,
  formData: FormData
): Promise<{ message: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const id = formData.get("id")?.toString();

  if (!id) {
    return { message: "ID is required" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/elections/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 422) {
        return { message: "Invalid ID" };
      }
      if (response.status === 500) {
        return { message: "Server error, please try again later" };
      }
      return { message: "Delete failed" };
    }

    return { message: "Delete successful" };
  } catch (error) {
    console.error("Delete error:", error);
    return { message: "Unexpected error occurred" };
  }
}
