import ElectionStatus from "@/components/electionStatus";
import { cookies } from "next/headers";
import CandidateCard from "@/components/candidateCard";
import NoElectionState from "@/components/noelectionState";

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token);
  const activeElectionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/current-election`,
    {
      next: { revalidate: 15 },
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const activeElection = await activeElectionRes.json();

  if (activeElection.message === "No active election found") {
    return <NoElectionState activeElection={false} />;
  }

  const hasVotedRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/votes/check/${activeElection.data.id}`,
    {
      next: { revalidate: 15 },
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const hasVoted = await hasVotedRes.json();

  if (hasVoted.message === "User does not have the right roles.") {
    return <NoElectionState activeElection={true} />;
  }
  const candidatesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates`,
    {
      next: { revalidate: 15 },
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mt-6">
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
