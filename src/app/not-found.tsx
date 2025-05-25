import Image from "next/image";
import NotFoundImage from "@/assets/images/404_Error.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center w-full px-4 h-auto min-h-[89svh] gap-4">
      <Image src={NotFoundImage} alt="Not Found" width={300} height={300} />
      <p className="text-xl sm:text-xl font-semibold text-center">
        Halaman Yang Kamu Cari Tidak Tersedia
      </p>
      <Link
        href={"/"}
        className="cursor-pointer w-fit py-2 px-4 text-sm font-medium border text-gray-700 hover:bg-neutral-200 text-center flex items-center justify-center h-10 bg-neutral-100 rounded-md"
      >
        Kembali
      </Link>
    </section>
  );
}
