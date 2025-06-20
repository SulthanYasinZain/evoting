"use client";
import { HelpContent, HelpAccordion } from "@/components/helpcontent";
import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Page() {
  const [tab, setTab] = useState<string>("Panduan Pengguna");

  const panduanPenggunaData = [
    {
      title: "Masuk ke Sistem Pemilu",
      video: "/Login.webm",
      description:
        "Gunakan NIM dan password yang sama dengan akun Siakad Anda untuk login ke dalam sistem.",
      alert:
        "Pastikan kredensial Anda benar. Sistem hanya menerima akun Siakad & Mahasiswa Aktif.",
    },
    {
      title: "Melihat Profil Kandidat",
      video: "/detail.webm",
      description:
        "Klik tombol 'Detail' pada masing-masing kandidat untuk melihat informasi lengkap, termasuk visi, misi, dan latar belakang. Gunakan tombol 'Selesai' untuk kembali ke halaman utama.",
    },
    {
      title: "Memberikan Suara",
      video: "/pilihkandidat.webm",
      description:
        "Setelah Anda yakin dengan pilihan kandidat, klik tombol 'Pilih' untuk mengirimkan suara Anda.",
      alert:
        "Harap periksa kembali sebelum memilih. Suara yang telah dikirim tidak dapat diubah.",
    },
  ];

  const faqData = [
    {
      question: "Apa itu Sistem Pemilu Fakultas Hukum?",
      answer:
        "Sistem Pemilu Fakultas Hukum adalah platform digital yang digunakan untuk pelaksanaan pemilihan umum di lingkungan Fakultas Hukum UPNVJ.",
    },
    {
      question: "Siapa saja yang dapat menggunakan sistem ini?",
      answer:
        "Sistem ini hanya dapat digunakan oleh mahasiswa aktif Fakultas Hukum UPNVJ yang memiliki akun Siakad resmi.",
    },
    {
      question: "Mengapa saya tidak bisa login?",
      answer:
        "Pastikan Anda adalah mahasiswa aktif Fakultas Hukum UPNVJ dan menggunakan kredensial akun Siakad yang benar.",
    },
    {
      question: "Mengapa tidak ada pemilu yang aktif?",
      answer:
        "Kemungkinan Anda telah menggunakan hak suara atau belum ada pemilu yang sedang berlangsung. Informasi terkait jadwal pemilu akan diumumkan melalui media sosial resmi Fakultas Hukum UPNVJ.",
    },
    {
      question: "Apakah sistem pemilu ini bersifat rahasia?",
      answer:
        "Ya, sistem ini dirancang untuk menjaga kerahasiaan suara. Tidak ada pihak yang dapat mengetahui siapa yang Anda pilih.",
    },
    {
      question: "Apakah saya bisa mengubah suara saya setelah voting?",
      answer:
        "Tidak, setelah Anda mengirimkan suara, pilihan tersebut bersifat final dan tidak dapat diubah. Pastikan Anda sudah yakin sebelum melakukan voting.",
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
              value="Panduan Pengguna"
              checked={tab === "Panduan Pengguna"}
              onChange={() => setTab("Panduan Pengguna")}
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
          {tab === "Panduan Pengguna" &&
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
            <>
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
              <div className="space-y-2">
                <p className="text-slate-600 text-center">
                  Butuh informasi lebih lanjut? Hubungi admin kami.
                </p>
                <a
                  href="/"
                  target="_blank"
                  className="group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full font-medium text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Hubungi Admin via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
