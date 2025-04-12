/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Search, CirclePlus } from "lucide-react";
import Link from "next/link";
import ElectionCard from "@/components/election-card";

export default function AdminHomepage({ data }: any) {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const election = data.data;
  console.log("Elections Data:", data.data);

  const filteredData = election.filter((election: any) => {
    console.log("data prop:", data);
    console.log("elections array:", election);

    return (
      election.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || election.status === filter)
    );
  });

  return (
    <section className="mx-4 h-[90svh] bg-background">
      <h1 className="font-semibold text-4xl">Managemen Pemilu</h1>
      <p className="text-xl">Tambahkan, Edit, dan Hapus Pemilu Disini</p>

      <div className="flex justify-between">
        <div className="flex flex-col gap-4 w-fit">
          <span className=" w-full  flex gap-4 items-center border p-2 rounded">
            <Search />
            <input
              type="text"
              className="w-full"
              placeholder="input"
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
          <span className="flex gap-2">
            {["all", "active", "closed", "upcoming"].map((type) => (
              <label
                key={type}
                htmlFor={type}
                className={`cursor-pointer px-4 py-2 rounded-lg border transition-all
        ${
          filter === type
            ? "bg-primary text-white border-primary"
            : "bg-white text-black border border-[#A0A0A0]"
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
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </span>
        </div>
        <Link
          href={"/admin/add"}
          className="w-fit h-fit flex items-center gap-2 bg-primary text-white py-2 px-4 rounded"
        >
          <CirclePlus />
          Tambah Pemilu
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-4">
        {filteredData.map((election: any) => (
          <ElectionCard
            id={election.id}
            key={election.id}
            title={election.title}
            date={election.election_date}
            variant={election.status}
            candidates={election.candidate_count}
            vote={election.voter_count}
            create={election.created_at.slice(0, 10)}
          />
        ))}
      </div>
    </section>
  );
}
