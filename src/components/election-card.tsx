"use client";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import ElectionData from "@/interfaces/electiondata";
import deleteElection from "@/app/action/deleteElection";
import { AnimatedList } from "@/components/magicui/animated-list";

const status = ({ variant }: { variant: string }) => {
  switch (variant) {
    case "active":
      return (
        <div className="bg-green-400 text-white rounded-full px-2 py-1 text-xs font-semibold w-fit">
          Active
        </div>
      );
    case "closed":
      return (
        <div className="bg-neutral-400 text-white rounded-full px-2 py-1 text-xs font-semibold w-fit">
          Closed
        </div>
      );
    case "upcoming":
      return (
        <div className="bg-blue-400 text-white rounded-full px-2 py-1 text-xs font-semibold w-fit">
          Upcoming
        </div>
      );
    default:
      return null;
  }
};

export default function ElectionCard({
  id,
  title,
  date,
  variant,
  candidates,
  vote,
  create,
}: ElectionData) {
  const [state, formAction, isPending] = useActionState(deleteElection, null);

  return (
    <div className="bg-background border border-[#A0A0A0] w-[300px] sm:w-1/3 max-w-[400px] h-fit flex flex-col p-4 gap-4 rounded-xl shadow-md">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <span className="flex gap-4 items-center">
          <CalendarDays />
          <p className="text-sm">{date}</p>
        </span>
        {status({ variant })}
      </div>

      <span className="flex justify-between">
        <div className="w-1/2">
          <p>Total Kandidat</p>
          <h2 className="font-semibold ">{candidates}</h2>
        </div>
        <div className="w-1/2">
          <p>Total Vote</p>
          <h2 className="font-semibold">{vote}</h2>
        </div>
      </span>

      <span className="flex justify-between">
        <div className="w-1/2">
          <p className="text-sm text-neutral-600">Dibuat Oleh</p>
          <h2>Admin</h2>
        </div>
        <div className="w-1/2">
          <p className="text-sm text-neutral-600">Dibuat Pada</p>
          <h2>{create}</h2>
        </div>
      </span>

      <span className="flex w-full items-center justify-center gap-2">
        <Link
          href={`/admin/detail/${id}`}
          className="bg-background border-2 text-center border-primary text-foreground rounded w-1/2 py-2 px-6"
        >
          Detail
        </Link>

        <form action={formAction} className="w-1/2">
          <input type="hidden" name="id" value={id} />
          <button
            disabled={isPending}
            className="bg-primary text-white rounded w-full py-2 px-6"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </form>
      </span>

      <AnimatedList className="absolute right-4 bottom-4">
        {state && (
          <div className="p-4 bg-blue-200">
            <p>{state.message}</p>
          </div>
        )}
      </AnimatedList>
    </div>
  );
}
