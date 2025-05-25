import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import HeroImage from "@/assets/images/hero_card.png";
import { cookies } from "next/headers";
import bawasra from "@/assets/images/bawasra.jpg";
import pemira from "@/assets/images/pemira.jpg";
import pemira2 from "@/assets/images/pemira2.jpg";
export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let activeElection = null;

  try {
    const activeElectionRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-election`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 10,
        },
      }
    );

    if (!activeElectionRes.ok) {
      throw new Error(`Server error: ${activeElectionRes.status}`);
    }

    activeElection = await activeElectionRes.json();
  } catch (error) {
    console.error("Error fetching active election:", error);
    activeElection = null;
  }

  return (
    <section className="flex justify-center items-center w-full px-4 h-auto min-h-[89svh] py-12">
      <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-8 w-full max-w-[1200px]">
        <div className="w-full sm:w-1/2 space-y-6 text-center sm:text-left">
          <div className="flex gap-4 items-center">
            <Image src={bawasra} alt="Logo baswara" width={50} height={50} />
            <Image src={pemira} alt="Logo pemira" width={50} height={50} />
            <Image src={pemira2} alt="Logo pemira" width={50} height={50} />

            {activeElection &&
            activeElection.message === "No active election found"
              ? null
              : activeElection && (
                  <Badge
                    variant="outline"
                    className="mx-auto sm:mx-0 w-fit h-fit bg-gray-100 text-gray-800 px-3 py-1 rounded-full border-gray-200"
                  >
                    {activeElection?.data?.title?.charAt(0).toUpperCase() +
                      activeElection?.data?.title?.slice(1)}
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2">
                      Active
                    </span>
                  </Badge>
                )}
          </div>
          <h1 className="text-gray-800 text-3xl sm:text-5xl font-semibold">
            Pemilihan Raya Fakultas Hukum 2025
          </h1>
          <p className="text-gray-600 text-base sm:text-xl">
            Ayo sukseskan pemilu yang jujur, adil, dan rahasia, di mana setiap
            suara berharga untuk masa depan yang lebih baik!
          </p>
          {token ? (
            <Link
              href="/homepage"
              className="inline-block bg-red-600 hover:bg-red-700 text-neutral-100 px-6 py-2 rounded"
            >
              Voting Sekarang
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-block bg-red-600 hover:bg-red-700 text-neutral-100 px-6 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>

        <div className="relative w-full sm:w-1/2 h-[300px] sm:h-[400px]">
          <Image
            src={HeroImage}
            alt="Logo UPN"
            fill
            className="object-contain"
            priority
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
