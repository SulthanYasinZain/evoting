"use client";

import ElectionCard from "@/components/election-card";
import { useState } from "react";
import { Search, CirclePlus } from "lucide-react";
import Link from "next/link";

const data = [
  {
    id: 1,
    title: "Pemilihan Bem 2025",
    status: "active",
    date: "2025-01-01",
    candidates: 2,
    vote: 500,
    create: "2023-10-01",
  },
  {
    id: 2,
    title: "Pemilihan DPM 2025",
    status: "closed",
    date: "2025-05-01",
    candidates: 2,
    vote: 700,
    create: "2023-10-01",
  },
  {
    id: 3,
    title: "Pemilihan Rektor 2024",
    status: "closed",
    date: "2024-01-01",
    candidates: 3,
    vote: 300,
    create: "2023-10-01",
  },
  {
    id: 4,
    title: "Pemilihan Dekan 2025",
    status: "upcoming",
    date: "2025-05-01",
    candidates: 3,
    vote: 900,
    create: "2023-10-01",
  },
  {
    id: 5,
    title: "Pemilihan Wakil Rektor 2025",
    status: "upcoming",
    date: "2025-05-01",
    candidates: 2,
    vote: 200,
    create: "2023-10-01",
  },
];

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  const filteredData = data.filter((election) => {
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
        {filteredData.map((election) => (
          <ElectionCard
            id={election.id}
            key={election.id}
            title={election.title}
            date={election.date}
            variant={election.status}
            candidates={election.candidates}
            vote={election.vote}
            create={election.create}
          />
        ))}
      </div>
    </section>
  );
}
