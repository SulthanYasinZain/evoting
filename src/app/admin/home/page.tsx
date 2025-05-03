// app/admin/home/page.tsx
import { cookies } from "next/headers";
import AdminHomepage from "@/components/adminHomepage";
import ServerErrorState from "@/components/servererorState";
import { Suspense } from "react";
import LoadingState from "@/components/loadingState";
import { redirect } from "next/navigation";

async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let electionData;

  try {
    const electionRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/elections`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const rawElectionData = await electionRes.json();
    electionData = rawElectionData.data;
  } catch (error) {
    console.error("Error fetching elections:", error);
    return <ServerErrorState />;
  }

  if (!electionData) {
    redirect("/api/logout");
  }

  return <AdminHomepage data={electionData} />;
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AdminPage />
    </Suspense>
  );
}
