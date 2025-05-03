"use client";

import ElectionStatus from "./electionStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NoElectionState({
  activeElection,
}: {
  activeElection?: boolean;
}) {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center   w-full px-4 h-auto min-h-[89svh]">
      {activeElection && (
        <div className="mt-6 w-full max-w-6xl">
          <ElectionStatus hasVoted={true} />
        </div>
      )}

      <Image
        src="/ilustrasi_noresult.png"
        alt="Tidak Ada Hasil"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Tidak Ada Pemilu Yang Aktif
        </h1>
        <p className="text-sm sm:text-lg text-gray-500">
          Saat ini tidak ada pemilihan yang aktif. Silakan periksa kembali nanti
          atau hubungi administrator untuk informasi lebih lanjut.
        </p>
        <button
          className="cursor-pointer w-fit py-2 px-4 text-sm font-medium border text-gray-700 hover:bg-neutral-200 text-center flex items-center justify-center h-10 bg-neutral-100 rounded-md"
          onClick={() => {
            router.refresh();
          }}
        >
          Refresh
        </button>
      </div>
    </section>
  );
}
