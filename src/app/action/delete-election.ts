"use server";
import { cookies } from "next/headers";

export default async function deleteElection(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, message: "Unauthorized" };
  }

  const deleteElectionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections/${id}`, // Correctly use `id` in the URL
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!deleteElectionRes.ok) {
    return { success: false, message: "Failed to delete election" };
  }

  return {
    success: true,
    message: "Election deleted successfully",
  };
}
