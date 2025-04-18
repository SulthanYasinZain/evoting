import ElectionManagement from "@/components/election-management";
import { toast } from "sonner";
import { cookies } from "next/headers";
import { Suspense } from "react";
async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const electionListRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const electionList = await electionListRes.json();
  if (!electionListRes.ok) {
    toast.error("Failed to fetch election list");
  }
  return <ElectionManagement electionData={electionList.data} />;
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
