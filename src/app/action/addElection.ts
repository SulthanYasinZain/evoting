/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export default async function AddElection(prevstate: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const title = formData.get("title") as string;
  const electionDate = formData.get("date") as string;

  try {
    const addElectionRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/elections`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          election_date: electionDate,
        }),
      }
    );
    const res = await addElectionRes.json();
    console.log("res", res);
    if (!addElectionRes.ok) {
      return { success: false, message: "Gagal Membuat Pemilu. Coba Lagi." };
    }

    return { success: true, message: "Berhasil Membuat Pemilu Baru" };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: "Server Error. Coba Lagi Nanti" };
  }
}
