"use server";
import { cookies } from "next/headers";

export default async function UpdateElection(
  prevstate: any,
  formData: FormData
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const electionId = formData.get("election_id") as string;
  const title = formData.get("title") as string;
  const electionDate = formData.get("date") as string;
  console.log("formdata", electionId, title, electionDate);

  const updateElectionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections/${electionId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: electionId,
        title: title,
        election_date: electionDate,
      }),
    }
  );
  const res = await updateElectionRes.json();
  console.log("res", res);
  if (!updateElectionRes.ok) {
    return { success: false, message: "Gagal melakukan Edit" };
  }

  return { success: true, message: "Berhasil melakukan Edit" };
}
