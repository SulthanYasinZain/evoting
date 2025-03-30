import test from "@/assets/videos/2025-03-28 21-40-07.mp4";
import React from "react";
export default function Card({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="w-full h-fit rounded-lg border border-[#A0A0A0]">
      <span className="flex gap-4 p-2 items-center border-b border-[#A0A0A0] ">
        <p className="rounded-full bg-primary text-lg font-bold text-white h-10 w-10 flex items-center justify-center">
          {number}
        </p>

        <h1 className="text-xl sm:text-3xl font-semibold ">{title}</h1>
      </span>
      <div className="p-4 flex flex-col h-full sm:flex-row gap-4 justify-between items-start">
        <p className="sm:w-1/2">{description}</p>
        <video
          width={540}
          height={300}
          className="rounded-lg"
          autoPlay
          loop
          muted
          controls={false}
        >
          <source src="/videos/2025-03-28 21-40-07.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
