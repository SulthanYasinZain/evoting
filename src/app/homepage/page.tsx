/* eslint-disable @typescript-eslint/no-explicit-any */

import ElectionStatus from "@/components/electionStatus";
import { cookies } from "next/headers";
import CandidateCard from "@/components/candidateCard";
import NoElectionState from "@/components/noelectionState";
import { Suspense } from "react";
import LoadingState from "@/components/loadingState";
import ServerErorState from "@/components/servererorState";
import { redirect } from "next/navigation";

async function Homepage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let activeElection = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-election`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    activeElection = await res.json();
  } catch (err) {
    console.error("Election error", err);
    return <ServerErorState />;
  }

  if (activeElection?.message === "No active election found") {
    return <NoElectionState activeElection={false} />;
  }

  const voteRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/votes/check/${activeElection.data.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const hasVoted = await voteRes.json();

  if (hasVoted.message === "User does not have the right roles.") {
    return <NoElectionState activeElection={true} />;
  }

  const candidateRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!candidateRes.ok) {
    redirect("/api/logout");
  }

  const rawCandidates = await candidateRes.json();

  const candidates = rawCandidates.data.filter(
    (c: any) => c.election_id === activeElection.data.id
  );

  return (
    <section className="flex flex-col items-center w-screen  px-4 h-auto min-h-[89svh]">
      <div className="mt-6 w-full">
        <ElectionStatus
          hasVoted={hasVoted.has_voted}
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

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Homepage />
    </Suspense>
  );
}
