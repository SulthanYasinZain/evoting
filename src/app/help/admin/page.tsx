"use client";
import { HelpContent, HelpAccordion } from "@/components/helpcontent";
import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";

export default function Page() {
  const [tab, setTab] = useState<string>("Panduan Admin");

  const panduanAdminData = [
    {
      title: "Akses ke Dasbor Administrator",
      video: "https://www.youtube.com/watch?v=example",
      description:
        "Untuk mengakses dasbor administrator, silakan buka halaman log masuk dan masukkan kredensial administrator Anda. Pastikan Anda menggunakan akun yang terdaftar dengan peran administrator. Selanjutnya, ketikkan '/admin/home' untuk menuju halaman administrator.",
      alert:
        "Dasbor Administrator hanya dapat diakses oleh pengguna dengan otorisasi administrator. Apabila Anda tidak memiliki akses, mohon hubungi administrator sistem.",
    },
    {
      title: "Penambahan Pemilihan Umum Baru",
      video: "https://www.youtube.com/watch?v=example",
      description:
        "Klik tombol 'Tambah Pemilu' pada dasbor administrator untuk membuat entri pemilihan umum yang baru. Isi seluruh informasi yang diperlukan, termasuk nama dan waktu pelaksanaan pemilihan.",
    },
    {
      title: "Penambahan Kandidat",
      video: "https://www.youtube.com/watch?v=example",
      description:
        "Setelah berhasil membuat entri pemilihan umum, Anda dapat menambahkan kandidat melalui tombol 'Detail' yang akan mengarahkan Anda ke halaman detail pemilihan. Pada halaman ini, Anda dapat menambahkan kandidat dengan mengisi nama lengkap, visi, dan nomor urut kandidat.",
      alert:
        "Penambahan kandidat hanya dapat dilakukan setelah entri pemilihan umum dibuat. Pastikan seluruh informasi kandidat akurat sebelum melakukan penyimpanan. Batas maksimum kandidat per pemilihan umum adalah 3.",
    },
    {
      title: "Pengubahan Data Kandidat",
      video: "https://www.youtube.com/watch?v=example",
      description:
        "Apabila Anda perlu melakukan perubahan informasi kandidat, silakan klik tombol 'Edit'. Anda dapat memperbarui nama lengkap, visi, dan nomor urut kandidat.",
    },
  ];

  const faqData = [
    {
      question:
        "Apakah dimungkinkan untuk menjalankan lebih dari satu pemilihan umum pada hari yang sama?",
      answer: "Tidak dimungkinkan.",
    },
    {
      question: "Mengapa saya tidak dapat mengakses halaman administrator?",
      answer:
        "Akses ke halaman administrator terbatas hanya untuk akun dengan otorisasi administrator. Apabila Anda tidak memiliki akses, mohon hubungi administrator sistem.",
    },
    {
      question: "Mengapa saya tidak dapat menghapus entri pemilihan umum?",
      answer:
        "Untuk menghapus entri pemilihan umum, Anda diwajibkan untuk menghapus seluruh data kandidat yang terdaftar terlebih dahulu. Setelah proses penghapusan kandidat selesai, Anda baru dapat menghapus entri pemilihan umum tersebut.",
    },
    {
      question:
        "Apakah dimungkinkan untuk menghapus entri pemilihan umum atau data kandidat yang sedang berlangsung?",
      answer: "Tidak dimungkinkan.",
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
              tab === "Panduan Admin"
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
            panduanAdminData.map((item) => (
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
