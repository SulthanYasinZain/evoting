"use client";
import { useState } from "react";
import PanduanMemulai from "@/components/helpsection/panduan-memulai";

export default function Help() {
  const isAdmin = true; // Replace with actual admin check logic
  const tabs = isAdmin
    ? ["Panduan Memulai", "Panduan Admin", "FAQ"]
    : ["Panduan Memulai", "FAQ"];

  const [currentTabs, setCurrentTabs] = useState(0);

  return (
    <section className="flex flex-col mt-8 justify-center mx-4 sm:mx-12 gap-8">
      <div className="space-y-4">
        <h1 className="font-bold text-3xl sm:text-4xl text-center">
          Pusat Bantuan Sistem Pemilu
        </h1>
        <p className=" text-base sm:text-lg text-center ">
          Halaman Ini memberikan Detail Cara menggunakan Website Pemilu Fakulats
          Hukum UPNVJ
        </p>
      </div>

      <div className="border border-[#A0A0A0] rounded">
        <span className="flex justify-evenly  ">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm sm:text-xl text-center border-b border-[#A0A0A0] transition-colors  sm:w-full ${
                currentTabs === index
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-500"
              }`}
              onClick={() => setCurrentTabs(index)}
            >
              {tab}
            </button>
          ))}
        </span>

        {currentTabs === 0 && <PanduanMemulai />}
        {currentTabs === 1 && <div>{isAdmin ? "Panduan Admin" : "FAQ"}</div>}
        {currentTabs === 2 && isAdmin && <div>FAQ</div>}
      </div>
    </section>
  );
}
