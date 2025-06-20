/* eslint-disable @typescript-eslint/no-explicit-any */

import ElectionStatus from "@/components/electionStatus";
import CandidateCard from "@/components/candidateCard";
import NoElectionState from "@/components/noelectionState";
import { Suspense } from "react";
import ServerErorState from "@/components/servererorState";
import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { safeFetch } from "@/lib/safeFetch";

async function Homepage() {
  const token = await getAuthToken();
  let activeElection = null;

  try {
    activeElection = await safeFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-election`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );
    if (activeElection?.message === "No active election found") {
      return <NoElectionState activeElection={false} />;
    }
  } catch (err) {
    return <ServerErorState />;
  }

  const voteRes = await safeFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/votes/check/${activeElection.data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (voteRes.message === "Unauthenticated.") {
    redirect("/api/logout");
  }

  if (
    voteRes.message === "User does not have the right roles." ||
    voteRes.has_voted === true
  ) {
    return <NoElectionState activeElection={true} />;
  }

  const candidateRes = await safeFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/candidates`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const candidates = candidateRes.data.filter(
    (c: any) => c.election_id === activeElection.data.id
  );

  return (
    <section className="flex flex-col items-center w-screen px-4 h-auto min-h-[89svh]">
      <div className="mt-6 w-full mx-4">
        <ElectionStatus
          hasVoted={voteRes.has_voted}
          title={activeElection.data.name}
          time={(() => {
            if (!activeElection.data.election_date) return "";
            const electionDate = new Date(activeElection.data.election_date);
            const now = new Date();
            const diff = electionDate.getTime() - now.getTime();
            const hours = Math.ceil(diff / (1000 * 60 * 60));

            if (hours > 0) {
              return `${hours} jam lagi`;
            } else if (hours <= 0) {
              return "Waktu pemilihan telah habis";
            } else {
              return "Waktu pemilihan telah tiba!";
            }
          })()}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full  mt-6">
        {candidates.map((candidate: any) => (
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
