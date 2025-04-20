import Image from "next/image";
import Link from "next/link";
import VoteConfirmationDialog from "./voteConfirmation";

export default function CandidateCard({
  candidate_id,
  name,
  vision,
  image_url,
  number,
}: {
  candidate_id: number;
  name: string;
  vision: string;
  image_url?: string;
  number: number;
}) {
  return (
    <div className="w-full h-full p-4 border border-neutral-200 rounded-xl space-y-2 shadow-sm bg-white">
      <div className="aspect-[2/1] relative w-full">
        <Image
          src={image_url || "https://placehold.co/800x400.png"}
          alt="Pemilu"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="border-b border-neutral-200 py-2">
        <p className="text-gray-500 text-sm">Kandidat {number}</p>
        <h1 className="text-2xl text-gray-800 font-semibold">{name}</h1>
      </div>
      <p className="text-md text-gray-600">{vision}</p>
      <div className="w-full flex gap-2 mt-4">
        <VoteConfirmationDialog
          candidate_id={candidate_id}
          candidate_name={name}
        />
        <Link
          href={`/homepage/details/${candidate_id}`}
          className="w-1/2 border text-sm font-medium text-gray-700 hover:bg-neutral-200 text-center flex items-center justify-center h-10 bg-neutral-100 rounded-md"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
