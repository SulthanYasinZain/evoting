/* eslint-disable @typescript-eslint/no-explicit-any */
import CandidateCard from "@/components/candidate-card";
import NoAvaiableElection from "@/components/no-avaiable-election";
import Alert from "@/components/alert";
import { cookies } from "next/headers";
import { AnimatedList } from "@/components/magicui/animated-list";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token from cookies:", token);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchActiveElection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections`,
    { method: "GET", headers }
  );
  const activeElectionData = await fetchActiveElection.json();
  const activeElection = activeElectionData.data.find(
    (e: any) => e.status === "active"
  );
  const activeElectionId = activeElection?.id;

  console.log("Active Election Data:", activeElection);
  console.log("Active Election ID:", activeElectionId);

  let isEligibleData = null;
  let canVote = false;

  if (activeElectionId) {
    const isEligible = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/votes/check/${activeElectionId}`,
      { method: "GET", headers }
    );
    isEligibleData = await isEligible.json();
    console.log("Eligibility Response:", isEligibleData);

    canVote = isEligibleData?.message !== "You already voted";
  } else {
    console.log("No active election ID found, skipping eligibility check.");
  }

  let candidates = [];
  if (canVote) {
    const fetchCandidates = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/candidates`,
      { method: "GET", headers }
    );
    const fetchCandidatesData = await fetchCandidates.json();
    candidates = fetchCandidatesData.data || [];

    console.log("Candidates Raw Response:", fetchCandidatesData);
    console.log("Candidates List:", candidates);
  }

  return (
    <section className="mx-4 flex flex-col items-center justify-center h-[90svh] bg-background gap-4">
      {canVote && activeElectionId && <Alert variant={"success"} />}

      {canVote && candidates.length > 0 ? (
        <div className="h-full flex gap-4">
          {candidates.map((candidate: any, index: number) => (
            <CandidateCard
              key={index}
              number={candidate.number}
              name={candidate.name}
              vision={candidate.vision}
              image={
                candidate.image_url
                  ? `${process.env.NEXT_PUBLIC_API_URL}${candidate.image_url}`
                  : "https://placehold.co/600x400"
              }
            />
          ))}
        </div>
      ) : (
        <NoAvaiableElection />
      )}

      <AnimatedList>
        <div className="p-4"></div>
      </AnimatedList>
    </section>
  );
}
