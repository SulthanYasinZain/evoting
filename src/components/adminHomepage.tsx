/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AddElectionDialog from "./addelectionDialog";
import ElectionCard from "@/components/electionCard";
import { useState } from "react";
import { Search, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

export default function AdminHomepage({ data }: { data: any }) {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const electionData = data || [];

  const filteredData = electionData.filter((election: any) => {
    return (
      election.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || election.status === filter)
    );
  });

  type FilterType = "all" | "active" | "closed" | "upcoming";

  const filterIcons: Record<FilterType, React.ReactNode> = {
    all: <Calendar className="h-4 w-4" />,
    active: <CheckCircle className="h-4 w-4" />,
    closed: <XCircle className="h-4 w-4" />,
    upcoming: <Clock className="h-4 w-4" />,
  };

  return (
    <section className="flex flex-col  w-full px-4 h-auto min-h-[89svh]">
      <h1 className="text-gray-800 font-semibold text-2xl mt-2">
        Selamat Datang, Admin!
      </h1>
      <p className="text-gray-500 text-lg my-2 ">
        Buat, lihat, dan edit pemilu disini
      </p>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="w-full md:max-w-sm space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search />
            </span>
            <input
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Disini"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 w-full">
            {["all", "active", "closed", "upcoming"].map((type) => (
              <label
                key={type}
                htmlFor={type}
                className={`text-center cursor-pointer px-2 py-2 rounded-md border text-sm transition-all w-full
                  ${
                    filter === type
                      ? "bg-red-500 text-white"
                      : "bg-white text-black border hover:bg-neutral-200"
                  }`}
              >
                <input
                  type="radio"
                  id={type}
                  name="filter"
                  value={type}
                  className="hidden"
                  onChange={(e) => setFilter(e.target.value)}
                />
                {/* Show icon on mobile, text on larger screens */}
                <span className="flex md:hidden justify-center">
                  {filterIcons[type as FilterType]}
                </span>
                <span className="hidden md:block">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <AddElectionDialog />
        </div>
      </div>

      {Array.isArray(electionData) && electionData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredData.map((election: any) => (
            <ElectionCard
              key={election.id}
              id={election.id}
              title={election.title}
              status={election.status}
              candidate_count={election.candidate_count}
              election_date={election.election_date}
              created_at={election.created_at}
              voter_count={election.voter_count}
            />
          ))}
        </div>
      ) : (
        <div className=" flex items-center justify-center h-full">
          <h2 className="text-gray-500 text-lg">Tidak ada pemilu ditemukan</h2>
        </div>
      )}
    </section>
  );
}
