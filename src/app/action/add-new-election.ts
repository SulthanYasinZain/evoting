/*eslint-disable @typescript-eslint/no-explicit-any */

"use server";
import { cookies } from "next/headers";
export default async function addNewElection(
  prevstate: any,
  formData: FormData
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const title = formData.get("title") as string;
  const election_date = formData.get("date") as string;

  if (!title || !election_date) {
    return { succes: false, message: "Title and election date are required" };
  }
  console.log(title, election_date);

  const newElectionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections`,
    {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        election_date,
      }),
    }
  );

  if (!newElectionRes.ok) {
    console.error("Failed to add election", newElectionRes.statusText);
    return { success: false, message: "Failed to add election" };
  }
  return {
    success: true,
    message: "Election added successfully",
  };
}
