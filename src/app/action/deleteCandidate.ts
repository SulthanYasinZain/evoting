/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export default async function DeleteCandidate(
  prevstate: any,
  formData: FormData
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const candidatesId = formData.get("candidate_id") as string;
  console.log("candidatesId", candidatesId);
  try {
    const deleteElectionRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidatesId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: candidatesId,
        }),
      }
    );
    const res = await deleteElectionRes.json();
    console.log("res", res);
    if (!deleteElectionRes.ok) {
      return { success: false, message: "GaGal Menhapus" };
    }

    return { success: true, message: "Berhasil melakukan Penhapusan" };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: "Server Error. Coba Lagi Nanti" };
  }
}
