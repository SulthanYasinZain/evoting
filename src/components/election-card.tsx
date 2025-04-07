import { CalendarDays } from "lucide-react";

const status = ({ variant }: { variant: "Active" | "closed" | "Upcoming" }) => {
  switch (variant) {
    case "Active":
      return (
        <div className="bg-green-400 text-white  rounded-full px-2 py-1 text-xs font-semibold w-fit">
          Active
        </div>
      );
    case "closed":
      return (
        <div className="bg-neutral-400 text-white rounded-full px-2 py-1 text-xs font-semibold w-fit">
          Closed
        </div>
      );
    case "Upcoming":
      return (
        <div className="bg-blue-400 text-white rounded-full px-2 py-1 text-xs font-semibold w-fit">
          Upcoming
        </div>
      );
  }
};

export default function ElectionCard() {
  return (
    <div className="bg-background border border-[#A0A0A0] w-[300px] h-fit flex flex-col p-4 gap-4 rounded-xl shadow-md">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Pemilihan BEM 2025</h1>
        <span className="flex gap-4 items-center">
          <CalendarDays />
          <p className="text-sm">Tanggal: 1 Januari 2024</p>
        </span>
        {status({ variant: "Upcoming" })}
      </div>
      <span className="flex justify-between">
        <div className="w-1/2">
          <p>Total Kandidat</p> <h2 className="font-semibold ">2</h2>
        </div>
        <div className="w-1/2">
          <p>Total Vote</p> <h2 className="font-semibold">278</h2>
        </div>
      </span>

      <span className="flex justify-between">
        <div className="w-1/2">
          <p className="text-sm text-neutral-600">Dibuat Oleh</p> <h2>Admin</h2>
        </div>
        <div className="w-1/2">
          <p className="text-sm text-neutral-600">Dibuat Pada</p>
          <h2>23 Oktober 2024</h2>
        </div>
      </span>

      <span className="flex w-full items-center justify-center gap-2">
        <button className="bg-background border-2 border-primary text-foreground rounded w-1/2 py-2 px-6">
          Detail
        </button>
        <button className="bg-primary text-background rounded w-1/2 py-2 px-6">
          Delete
        </button>
      </span>
    </div>
  );
}
