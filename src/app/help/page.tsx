"use client";
import { useState } from "react";
import PanduanMemulai from "@/components/helpsection/panduan-memulai";
export default function Help() {
  const [currentTabs, setCurrentTabs] = useState(0);
  const tabs = ["Panduan Memulai", "Panduan Pemilihan", "panduan Admin", "FAQ"];

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
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm sm:text-xl text-center border-b border-[#A0A0A0] transition-colors  sm:w-full ${
                currentTabs === tabs.indexOf(tab)
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-500"
              }`}
              onClick={() => setCurrentTabs(tabs.indexOf(tab))}
            >
              {tab}
            </button>
          ))}
        </span>
        {currentTabs === 0 && (
          <PanduanMemulai /> // Assuming this is the component for "Panduan Memulai"
        )}
        {currentTabs === 1 && <div className="p-4">Panduan Pemilihan</div>}
        {currentTabs === 2 && <div className="p-4">Panduan Admin</div>}
        {currentTabs === 3 && <div className="p-4">FAQ</div>}
      </div>
    </section>
  );
}
