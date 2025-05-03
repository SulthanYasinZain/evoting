// app/admin/home/page.tsx
import { cookies } from "next/headers";
import AdminHomepage from "@/components/adminHomepage";
import { Suspense } from "react";
import LoadingState from "@/components/loadingState";
import { redirect } from "next/navigation";

async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let electionData = [];

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

  if (!electionRes.ok) {
    if (
      rawElectionData.message === "User does not have the right roles." ||
      rawElectionData.message === "Unauthenticated."
    ) {
      redirect("/api/logout");
    }
    console.error("API responded with non-OK status:", electionRes.status);
  }
  electionData = rawElectionData.data;

  return <AdminHomepage data={electionData} />;
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AdminPage />
    </Suspense>
  );
}
