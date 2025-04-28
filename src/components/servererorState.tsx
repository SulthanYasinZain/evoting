import Image from "next/image";

export default function ServerErrorState() {
  return (
    <section className="flex items-center justify-center w-full px-4 h-auto min-h-[89svh]">
      <div className="flex flex-col items-center justify-center w-full max-w-6xl text-center">
        <Image
          src="/Error_429-pana.svg"
          alt="Server Error"
          width={300}
          height={300}
        />
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Server Error
        </h1>
        <p className="text-sm sm:text-lg text-gray-500 mt-2">
          Terjadi kesalahan pada server. Silakan coba lagi nanti.
        </p>
      </div>
    </section>
  );
}
