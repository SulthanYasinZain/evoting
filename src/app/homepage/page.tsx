import ElectionStatus from "@/components/electionStatus";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import CandidateCard from "@/components/candidateCard";

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token);
  const activeElectionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/current-election`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const activeElection = await activeElectionRes.json();

  const hasVotedRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/votes/check/${activeElection.data.id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const hasVoted = await hasVotedRes.json();
  console.log(hasVoted);

  const candidatesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const rawCandidates = await candidatesRes.json();
  const candidates = rawCandidates.data.filter(
    (candidate: any) => candidate.election_id === activeElection.data.id
  );

  return (
    <section className="flex flex-col items-center w-full px-4 h-auto min-h-[90svh]">
      <div className="mt-6 w-full max-w-6xl">
        <ElectionStatus
          hasVoted={hasVoted.has_voted}
          title={activeElection.name}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mt-6">
        {candidates.map((candidate: any) => (
          <CandidateCard
            candidate_id={candidate.id}
            key={candidate.id}
            title={`Kandidat ${candidate.number}`}
            name={candidate.name}
            vision={candidate.vision}
          />
        ))}
      </div>
    </section>
  );
}
