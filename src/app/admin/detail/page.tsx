"use client";
import { CalendarDays } from "lucide-react";
import TotalVotes from "@/components/totalvotes";
import BarChartCard from "@/components/barchartcard";
import PiechartCard from "@/components/piechartcard";
import LineChartCard from "@/components/LineChartCard";
export default function Detail() {
  const status = ({
    variant,
  }: {
    variant: "Active" | "closed" | "Upcoming";
  }) => {
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
  return (
    <section className="flex flex-col h-[90svh]">
      <span className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Pemilihan BEM 2025</h1>
          <span className="flex gap-4 items-center">
            <CalendarDays />
            <p className="text-sm">Tanggal: 1 Januari 2024</p>
          </span>
          {status({ variant: "Upcoming" })}
        </div>
        <button className="bg-primary text-background rounded w-fit py-2 px-6">
          Delete
        </button>
      </span>
      {/* 
      <div className="flex h-full">
      <LineChartCard />

      <div className="w-1/2">
        <div className="flex">
        
        <TotalVotes />
        </div>
        
      </div>
      </div> */}

      <div className="flex h-full gap-4 m-4">
        <LineChartCard />
        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex h-1/2 gap-4">
            <PiechartCard />
            <TotalVotes />
          </div>
          <BarChartCard />
        </div>
      </div>
    </section>
  );
}
