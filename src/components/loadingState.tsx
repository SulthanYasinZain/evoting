"use client";
import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <section className="flex flex-col items-center justify-center w-full px-4 h-auto min-h-[89svh]">
      <Loader2 className="animate-spin h-6 w-6 text-black" />
      <p className="text-gray-500 mt-4">Loading...</p>
    </section>
  );
}
