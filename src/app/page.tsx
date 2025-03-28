import Image from "next/image";
import Link from "next/link";
import Herocard from "@/assets/images/hero-card.png";
import HeroStatus from "@/components/herostatus";

export default function Home() {
  return (
    <section className="flex h-[90vh] items-center">
      <div className="flex flex-col-reverse sm:flex-row justify-around sm:justify-center items-center h-full w-full">
        <div className="flex flex-col items-center sm:items-start justify-center gap-4 w-full sm:w-1/2 px-4">
          <HeroStatus title="Pemilihan Ketua BEM 2025" />
          <h1 className="text-3xl sm:text-6xl font-bold text-center sm:text-left">
            Website Pemilu Fakultas Hukum UPNVJ
          </h1>
          <p className="text-sm sm:text-2xl text-center sm:text-left sm:w-[40vw]">
            Ayo sukseskan pemilu yang jujur, adil, dan rahasia, di mana setiap
            suara berharga untuk masa depan yang lebih baik!
          </p>
          <Link
            href="/login"
            className="w-fit py-3 px-6 bg-primary text-background rounded-md"
          >
            Login
          </Link>
        </div>
        <Image
          className="hidden sm:block"
          src={Herocard}
          alt="hero"
          width={500}
          height={500}
          draggable={false}
        />
        <Image
          className="sm:hidden"
          src={Herocard}
          alt="hero"
          width={300}
          height={300}
          draggable={false}
        />
      </div>
    </section>
  );
}
