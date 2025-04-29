"use client";
import { HelpContent, HelpAccordion } from "@/components/helpcontent";
import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";

export default function Page() {
  const [tab, setTab] = useState<string>("Panduan Pengguna");

  const panduanPenggunaData = [
    {
      title: "Masuk ke Sistem Pemilu",
      video: "https://www.youtube.com/watch?v=example",
      description:
        "Gunakan NIM dan password yang sama dengan akun Siakad Anda untuk login ke dalam sistem.",
      alert:
        "Pastikan kredensial Anda benar. Sistem hanya menerima akun Siakad & Mahasiswa Aktif.",
    },
    {
      title: "Melihat Profil Kandidat",
      video: "https://www.youtube.com/watch?v=example",
      description:
        "Klik tombol 'Detail' pada masing-masing kandidat untuk melihat informasi lengkap, termasuk visi, misi, dan latar belakang. Gunakan tombol 'Selesai' untuk kembali ke halaman utama.",
    },
    {
      title: "Memberikan Suara",
      video: "https://www.youtube.com/watch?v=example",
      description:
        "Setelah Anda yakin dengan pilihan kandidat, klik tombol 'Pilih' untuk mengirimkan suara Anda.",
      alert:
        "Harap periksa kembali sebelum memilih. Suara yang telah dikirim tidak dapat diubah.",
    },
  ];

  const faqData = [
    {
      question:
        "Apakah Bisa Menjalankan lebih dari 1 pemilu dalam 1 hari yang sama?",
      answer: "tidak bisa",
    },
  ];

  return (
    <section className="flex flex-col items-center w-full px-4 h-auto min-h-[89svh] py-8">
      <h1 className="text-gray-800 text-2xl sm:text-4xl font-semibold">
        Pusat Bantuan Sistem Pemilu Fakultas Hukum
      </h1>
      <p className="text-gray-600">
        Halaman ini memberikan detail cara menggunakan website Pemilu Fakultas
        Hukum UPNVJ
      </p>

      <div className="w-full border border-gray-500 rounded-lg mt-6">
        <div className="flex justify-evenly w-full">
          <label
            className={`cursor-pointer p-4 border-b w-full text-center ${
              tab === "Panduan Pengguna"
                ? "border-red-500 text-red-500 font-semibold"
                : " border-gray-500 text-gray-500"
            }`}
          >
            <input
              type="radio"
              name="tab"
              value="Panduan Admin"
              checked={tab === "Panduan Admin"}
              onChange={() => setTab("Panduan Admin")}
              className="hidden"
            />
            Panduan Pengguna
          </label>

          <label
            className={`cursor-pointer p-4 border-b w-full text-center ${
              tab === "FAQ"
                ? "border-red-500 text-red-500 font-semibold"
                : "border-gray-500 text-gray-500"
            }`}
          >
            <input
              type="radio"
              name="tab"
              value="FAQ"
              checked={tab === "FAQ"}
              onChange={() => setTab("FAQ")}
              className="hidden"
            />
            FAQ
          </label>
        </div>

        <div className=" flex flex-col gap-2 sm:gap-8 text-gray-700 p-2 sm:p-8">
          {tab === "Panduan Admin" &&
            panduanPenggunaData.map((item) => (
              <HelpContent
                key={item.title}
                title={item.title}
                video={item.video}
                description={item.description}
                alert={item.alert}
              />
            ))}
          {tab === "FAQ" && (
            <Accordion type="single" collapsible>
              {faqData.map((item, index) => (
                <HelpAccordion
                  key={index}
                  item={`item-${index}`}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
}
