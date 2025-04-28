import { cookies } from "next/headers";
import AdminHomepage from "@/components/adminHomepage";
import ServerErrorState from "@/components/servererorState";
import { Suspense } from "react";
import LoadingState from "@/components/loadingState";

async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
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
    console.log(electionData);
    return <AdminHomepage data={electionData} />;
  } catch (error) {
    console.error("Error fetching elections:", error);
    return <ServerErrorState />;
  }
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AdminPage />;
    </Suspense>
  );
}
