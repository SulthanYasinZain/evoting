import { cookies } from "next/headers";
import { Suspense } from "react";
import AddElectionDialog from "@/components/addelectionDialog";

import ElectionCard from "@/components/electionCard";
import AdminHomepage from "@/components/adminHomepage";
export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const electionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  const rawElectionData = await electionRes.json();
  const electionData = rawElectionData.data;

  return <AdminHomepage data={electionData} />;
}
