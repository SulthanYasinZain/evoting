import Image from "next/image";
import NoResult from "@/assets/images/no-result.svg";

export default function NoAvaiableElection() {
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <Image
        src={NoResult}
        alt="No Result"
        width={350}
        height={350}
        className="mx-auto"
        draggable={false}
      />
      <h1 className="font-semibold text-2xl sm:text-3xl text-center mb-4">
        Tidak ada pemilu yang berjalan saat ini.
      </h1>
      <p className="text-md text-center">
        Pemilu belum tersedia saat ini. Pastikan Anda kembali lagi saat pemilu
        dimulai.
      </p>
    </div>
  );
}
