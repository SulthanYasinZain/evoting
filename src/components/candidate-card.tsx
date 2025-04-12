import Image from "next/image";

export default function CandidateCard({
  number,
  name,
  vision,
  image,
}: {
  number: number;
  name: string;
  vision: string;
  image: string;
}) {
  return (
    <div className="bg-background border border-[#A0A0A0] w-[300px] h-fit rounded-xl">
      <Image
        src={image || "https://placehold.co/600x400"}
        alt="Image"
        className="rounded-t-xl"
        width={600}
        height={400}
      />
      <div className="p-2 space-y-1">
        <p className="text-sm text-[#6d6d6d]">Kandidat {number}</p>
        <h1 className="font-semibold text-xl">{name}</h1>
        <p>{vision}</p>
        <span className="flex w-full items-center justify-center gap-2">
          <button className="bg-background border-2 border-primary text-foreground rounded w-1/2 py-2 px-6">
            Detail
          </button>
          <button className="bg-primary text-background rounded w-1/2 py-2 px-6">
            Delete
          </button>
        </span>
      </div>
    </div>
  );
}
