/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export default async function DeleteCandidate(
  prevstate: any,
  formData: FormData
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const candidatesId = formData.get("election_id") as string;

  const deleteElectionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections/${candidatesId}`,
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
}
