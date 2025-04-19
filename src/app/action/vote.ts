"use server";
import { cookies } from "next/headers";

export default async function Vote(prevstate: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const candidateID = formData.get("candidate_id") as string;
  const voteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      candidate_id: candidateID,
    }),
  });
  if (!voteRes.ok) {
    return { success: false, message: "Gagal melakukan pemilihan" };
  }
  const vote = await voteRes.json();
  return { success: true, message: "Berhasil melakukan pemilihan" };
}
