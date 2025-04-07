import Card from "@/components/helpsection/card";
import { memo } from "react";
const PanduanMemulai = memo(function PanduanMemulai() {
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
              2. Masukkan nama pengguna di kolom `&quot;`Nama Pengguna`&quot;`.
              <br />
              3. Masukkan kata sandi di kolom `&quot;`Kata Sandi`&quot;`.
              <br />
              4. Klik tombol `&quot;`Login`&quot;` untuk mengakses sistem.
            </>
          }
        />
      </div>
    </div>
  );
});

export default PanduanMemulai;
