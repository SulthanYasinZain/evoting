import ElectionStatus from "@/components/admin/electionStatus";
import CandidateCard from "@/components/candidates/candidateCard";
import NoElectionState from "@/components/shared/noelectionState";
import { Suspense } from "react";
import ServerErorState from "@/components/shared/servererorState";
import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { getSisaWaktuPemilihan } from "@/lib/getElectionCountdown";

type Candidate = {
  id: number;
  election_id: number;
  number: number;
  name: string;
  vision: string;
  mission: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

async function Homepage() {
  const token = await getAuthToken();

  if (!token) {
    redirect("/");
  }
  let activeElection;

  try {
    activeElection = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-election`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "force-cache",
      }
    ).then((res) => res.json());
    if (activeElection.message === "No active election found") {
      return <NoElectionState activeElection={false} />;
    }
  } catch (err) {
    console.error("Error fetching active election:", err);
    return <ServerErorState />;
  }
  console.log("Active Election:", activeElection);
  const voteRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/votes/check/${activeElection.data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  ).then((res) => res.json());

  if (voteRes.message === "Unauthenticated.") {
    redirect("/api/logout");
  }

  const sisaWaktu = getSisaWaktuPemilihan(activeElection.data.election_date);
  const isExpired = sisaWaktu === "Waktu pemilihan telah habis";

  if (
    voteRes.message === "User does not have the right roles." ||
    voteRes.has_voted === true ||
    (isExpired && voteRes.has_voted)
  ) {
    return <NoElectionState activeElection={true} />;
  }

  if (isExpired && !voteRes.has_voted) {
    return <NoElectionState activeElection={false} />;
  }

  const candidateRes: { data: Candidate[] } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/candidates`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: 15 },
    }
  ).then((res) => res.json());

  const candidates = candidateRes.data.filter(
    (c: Candidate) => c.election_id === activeElection.data.id
  );

  if (candidates.length === 0) {
    return <NoElectionState activeElection={false} />;
  }

  return (
    <section className="flex flex-col items-center w-screen px-4 h-auto min-h-[89svh]">
      <div className="mt-6 w-full mx-4">
        <ElectionStatus
          hasVoted={voteRes.has_voted}
          title={activeElection.data.name}
          time={getSisaWaktuPemilihan(activeElection.data.election_date)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full  mt-6">
        {candidates.map((candidate: Candidate) => (
          <CandidateCard
            candidate_id={candidate.id}
            image_url={candidate.image_url}
            key={candidate.id}
            number={candidate.number}
            name={candidate.name}
            vision={candidate.vision}
          />
        ))}
      </div>
    </section>
  );
}

function Loading() {
  const SkeletonCard = () => (
    <div className="w-full h-full p-4 border border-neutral-200 rounded-xl space-y-2 shadow-sm bg-white">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="w-full h-8" />
      <div className="border-b border-neutral-200"></div>
      <Skeleton className="w-full h-8" />
      <div className="w-full flex gap-2 mt-4">
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-1/2 h-10" />
      </div>
    </div>
  );

  return (
    <section className="flex flex-col items-center w-screen px-4 h-auto min-h-[89svh]">
      <div className="mt-6 w-full mx-4">
        <Skeleton className="w-full h-14" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Homepage />
    </Suspense>
  );
}
