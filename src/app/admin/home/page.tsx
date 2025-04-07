import ElectionCard from "@/components/election-card";
import { Search } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <section className="mx-4 h-[90svh] bg-background">
      <h1 className="font-semibold text-4xl">Managemen Pemilu</h1>
      <p className="text-xl">Tambahkan, Edit, dan Hapus Pemilu Disini</p>
      <span className="w-full flex justify-between items-center mb-4">
        <span className="flex gap-4 items-center border p-2 rounded">
          <Search />
          <input type="text" placeholder="input" />
        </span>
        <Link href={"/admin/add"} className="bg-primary text-white p-4">
          Tambah Pemilu
        </Link>
      </span>
      <span className="flex gap-2">
        <button className="bg-primary py-2 px-4 text-white rounded-lg">
          All
        </button>
        <button className="border border-[#A0A0A0] py-2 px-4 rounded-lg">
          Active
        </button>
        <button className="border  border-[#A0A0A0] py-2 px-4 rounded-lg">
          Closed
        </button>
        <button className="border  border-[#A0A0A0] py-2 px-4 rounded-lg">
          upcoming
        </button>
      </span>
      <div className="flex mt-4">
        <ElectionCard />
      </div>
    </section>
  );
}
