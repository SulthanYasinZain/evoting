import { toast } from "sonner";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Pencil,
  Trash2,
  User,
  Users,
  Vote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ElectionCard from "@/components/electionCard";
export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const electionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections`,
    {
      next: { revalidate: 5 },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  const rawElectionData = await electionRes.json();
  const electionData = rawElectionData.data;

  return (
    <section className="flex flex-col  w-full px-4 h-auto min-h-[89svh]">
      <h1 className="text-gray-800 font-semibold text-2xl">
        Selamat Datang, Admin!
      </h1>
      <p className="text-gray-500 text-lg">
        Buat, lihat, dan edit pemilu disini
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {electionData.map((election: any) => (
          <ElectionCard
            key={election.id}
            id={election.id}
            title={election.title}
            status={election.status}
            candidate_count={election.candidate_count}
            election_date={election.election_date}
            created_at={election.created_at}
            voter_count={election.voter_count}
          />
        ))}
      </div>
    </section>
  );
}
