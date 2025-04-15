/*eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import ElectionHeader from "@/components/election-header";
import HomeEptystate from "@/components/homeeptystate";
import { cookies } from "next/headers";

async function fetchElectionData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found in cookies.");
    return { activeElection: null, candidates: [], canVote: false };
  }

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const getJSON = async (url: string) => {
    const res = await fetch(url, { headers });
    return res.json();
  };

  const electionRes = await getJSON(
    `${process.env.NEXT_PUBLIC_API_URL}/current-election`
  );

  const activeElectionId = electionRes.data?.id;
  const activeElectionTitle = electionRes.data?.title;
  if (!activeElectionId) {
    return { activeElection: null, candidates: [], canVote: false };
  }

  const eligibilityRes = await getJSON(
    `${process.env.NEXT_PUBLIC_API_URL}/votes/check/${activeElectionId}`
  );
  const canVote = eligibilityRes?.message !== "You already voted";

  let candidates = [];
  if (canVote) {
    const candidatesRes = await getJSON(
      `${process.env.NEXT_PUBLIC_API_URL}/candidates`
    );
    candidates = candidatesRes.data || [];
    console.log(candidatesRes);
  }

  return { activeElectionId, activeElectionTitle, candidates, canVote };
}

export default async function HomePage() {
  const {
    activeElectionId,
    activeElectionTitle,
    candidates = [],
    canVote,
  } = await fetchElectionData();

  if (!activeElectionId) {
    return <HomeEptystate />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ElectionHeader
        title={activeElectionTitle}
        dateRange={`${new Date().toLocaleDateString()} - ${new Date(
          new Date().setDate(new Date().getDate() + 7)
        ).toLocaleDateString()}`}
        hasVoted={!canVote}
        isActive={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {candidates.map((candidate: any) => (
          <div
            key={candidate.id}
            className="bg-gray-200 rounded-lg overflow-hidden w-full max-w-sm"
          >
            <div className="aspect-[2/1] relative">
              <Image
                src={candidate.image || "/placeholder.svg"}
                alt={candidate.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <div className="text-sm text-gray-500 mb-1">
                {candidate.number}
              </div>
              <h3 className="text-xl font-bold mb-1">{candidate.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{candidate.vision}</p>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
                  disabled={!canVote}
                >
                  Vote
                </Button>
                <Button variant="outline" className="flex-1">
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
