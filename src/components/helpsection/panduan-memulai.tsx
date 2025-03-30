import Card from "@/components/helpsection/card";

export default function PanduanMemulai() {
  return (
    <div className="p-4">
      <div>
        <h1 className="font-bold text-4xl mb-4">
          Panduan Memakai Sistem Pemilu
        </h1>
        <Card
          number={1}
          title="Melihat Calon Kandidat"
          description={
            <>
              Untuk mengakses Sistem Pemilihan, buka halaman login dan masukkan
              kredensial Anda.
              <br />
              1. Buka browser web Anda dan navigasikan ke URL sistem pemilihan.
              <br />
              2. Masukkan nama pengguna di kolom "Nama Pengguna".
              <br />
              3. Masukkan kata sandi di kolom "Kata Sandi".
              <br />
              4. Klik tombol "Login" untuk mengakses sistem.
            </>
          }
        />
      </div>
    </div>
  );
}
