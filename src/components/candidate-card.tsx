import Image from "next/image";

export default function CandidateCard() {
  return (
    <div className="bg-background border border-[#A0A0A0] w-[300px] h-fit rounded-xl">
      <Image
        src={"https://placehold.co/600x400"}
        alt="Image"
        className="rounded-t-xl"
        width={600}
        height={400}
      />
      <div className="p-2 space-y-2">
        <h1 className="font-semibold text-xl">Prabowo & Gibran</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laborum
          sequi in. Aliquid laudantium quis quisquam nihil, exercitationem
          facilis
        </p>
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
