"use client";
import { HelpContent, HelpAccordion } from "@/components/helpcontent";
import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { ArrowRight, Bug } from "lucide-react";

export default function Page() {
  const [tab, setTab] = useState<string>("Panduan Admin");

  const panduanAdminData = [
    {
      title: "Akses ke Dashboard Administrator",
      video: "/dashboardAdmin.mp4",
      description:
        "Untuk mengakses dashboard administrator, mulailah dengan membuka halaman login dan masukkan kredensial akun Anda. Pastikan bahwa akun yang digunakan memiliki hak akses sebagai administrator. Setelah berhasil masuk, arahkan browser ke '/admin/home' untuk membuka halaman dashboard administrator.",
      alert:
        "Perlu diketahui bahwa akses ke dashboard administrator hanya tersedia bagi pengguna yang memiliki otorisasi sebagai administrator. Jika Anda mengalami kendala saat mencoba mengakses halaman ini, silakan hubungi administrator sistem untuk bantuan lebih lanjut.",
    },
    {
      title: "Menambahkan Pemilihan Umum Baru",
      video: "/MembuatPemilu.mp4",
      description:
        "Setelah berhasil masuk ke dashboard administrator, Anda dapat menambahkan pemilihan umum baru dengan mengklik tombol 'Tambah Pemilu'. Pastikan Anda mengisi seluruh informasi yang dibutuhkan dengan lengkap dan benar, termasuk nama pemilihan dan jadwal pelaksanaannya.",
    },
    {
      title: "Menambahkan Kandidat",
      video: "/AddKandidat.mp4",
      description:
        "Setelah membuat entri pemilihan umum, Anda akan diarahkan ke halaman detail pemilihan melalui tombol 'Detail'. Pada halaman ini, Anda dapat menambahkan kandidat dengan melengkapi informasi seperti nama lengkap, visi, serta nomor urut kandidat.",
      alert:
        "Penambahan kandidat hanya bisa dilakukan jika entri pemilihan umum telah dibuat sebelumnya. Pastikan semua data yang dimasukkan telah diverifikasi dan benar sebelum menyimpan. Sistem membatasi jumlah maksimum kandidat per pemilihan umum sebanyak 3 kandidat.",
    },
    {
      title: "Mengubah Informasi Kandidat",
      video: "/editKandidat.mp4",
      description:
        "Jika Anda perlu memperbarui informasi kandidat, silakan klik tombol 'Edit' pada data kandidat yang dimaksud. Anda dapat memperbarui nama lengkap, visi, maupun nomor urut kandidat sesuai kebutuhan.",
    },
  ];

  const faqData = [
    {
      question:
        "Apakah saya dapat menyelenggarakan lebih dari satu pemilihan umum pada hari yang sama?",
      answer:
        "Saat ini, sistem tidak mendukung pelaksanaan lebih dari satu pemilihan umum pada hari yang sama. Hal ini dilakukan untuk menjaga integritas data dan menghindari konflik jadwal.",
    },
    {
      question:
        "Mengapa saya tidak dapat mengakses halaman dashboard administrator?",
      answer:
        "Akses ke dashboard administrator dibatasi hanya untuk akun yang telah memiliki otorisasi sebagai administrator. Jika akun Anda tidak memiliki izin tersebut, silakan hubungi administrator sistem untuk mendapatkan akses atau informasi lebih lanjut.",
    },
    {
      question:
        "Saya tidak bisa menghapus entri pemilihan umum. Apa penyebabnya?",
      answer:
        "Sebelum Anda dapat menghapus entri pemilihan umum, seluruh data kandidat yang terdaftar dalam pemilihan tersebut harus dihapus terlebih dahulu. Setelah semua kandidat dihapus, sistem akan mengizinkan Anda untuk menghapus entri pemilihan umum.",
    },
    {
      question:
        "Bisakah saya menghapus pemilihan umum atau data kandidat yang sedang berlangsung?",
      answer:
        "Tidak. Untuk menjaga stabilitas sistem dan menjamin proses pemilihan berjalan sesuai aturan, penghapusan entri pemilihan umum atau data kandidat yang sedang berlangsung tidak diizinkan.",
    },
  ];

  return (
    <section className="flex flex-col items-center w-full px-4 h-auto min-h-[89svh] py-8">
      <h1 className="text-gray-800 text-2xl sm:text-4xl text-center font-semibold">
        Pusat Bantuan Sistem Pemilu Fakultas Hukum
      </h1>
      <p className="text-gray-600 text-center">
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
            Panduan Admin
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
              <div className="space-y-2 pt-4">
                <p className="text-slate-600 text-center">
                  Untuk pertanyaan teknis, laporan bug, atau saran pengembangan
                  website.
                </p>
                <a
                  href="mailto:sulthanzain28@gmail.com?subject=Website%20Pemilu%20Fakultas%20Hukum"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full font-medium text-white transition-all duration-300 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 hover:from-rose-600 hover:via-pink-600 hover:to-fuchsia-600 shadow-md hover:shadow-lg"
                >
                  <Bug className="w-5 h-5" />
                  <span>Hubungi Vendor Website</span>
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
