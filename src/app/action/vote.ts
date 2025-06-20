/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export default async function Vote(
  // candidate_id: number,
  prevstate: any,
  formData: FormData
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const candidateID = formData.get("candidate_id") as string;
  try {
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
    return { success: true, message: "Berhasil melakukan pemilihan" };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: "Server Error. Coba Lagi Nanti" };
  }
}
