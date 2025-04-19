"use client";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import Vote from "@/app/action/vote";
import { Loader2 } from "lucide-react";
export default function CandidateCard({
  candidate_id,
  title,
  name,
  vision,
  image_url,
}: {
  candidate_id: number;
  title: string;
  name: string;
  vision: string;
  image_url?: string;
}) {
  const [state, voteAction, isLoading] = useActionState(Vote, null);
  return (
    <form
      action={voteAction}
      className="w-full h-full p-4 border border-neutral-200 rounded-xl space-y-2 shadow-sm bg-white"
    >
      <input
        type="number"
        readOnly
        hidden
        name="candidate_id"
        value={candidate_id}
      />
      <div className="aspect-[2/1] relative w-full">
        <Image
          src={image_url || "https://placehold.co/800x400.png"}
          alt="Pemilu"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h1 className="text-xl text-gray-800 font-semibold">{name}</h1>
      <p className="text-sm text-gray-500">{vision}</p>
      <div className="w-full flex gap-2 mt-4">
        <button
          className="w-1/2 hover:bg-red-600 disabled:bg-red-400 bg-red-500 text-white rounded-md p-2 h-10"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            "Pilih"
          )}
        </button>
        <Link
          href={"/help"}
          className="w-1/2 text-sm font-medium text-gray-700 hover:bg-neutral-200 text-center flex items-center justify-center h-10 bg-neutral-100 rounded-md"
        >
          Detail
        </Link>
      </div>
    </form>
  );
}
