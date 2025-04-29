import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import HeroImage from "@/assets/images/hero_card.png";
export default async function Home() {
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
        {/* Left Side */}
        <div className="w-full sm:w-1/2 space-y-6 text-center sm:text-left">
          {activeElection &&
          activeElection.message === "No active election found"
            ? null
            : activeElection && (
                <Badge
                  variant="outline"
                  className="mx-auto sm:mx-0 w-fit bg-gray-100 text-gray-800 px-3 py-1 rounded-full border-gray-200"
                >
                  {activeElection?.data?.title?.charAt(0).toUpperCase() +
                    activeElection?.data?.title?.slice(1)}
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2">
                    Active
                  </span>
                </Badge>
              )}
          <h1 className="text-gray-800 text-3xl sm:text-5xl font-semibold">
            Website Pemilu Fakultas Hukum UPNVJ
          </h1>
          <p className="text-gray-600 text-base sm:text-xl">
            Ayo sukseskan pemilu yang jujur, adil, dan rahasia, di mana setiap
            suara berharga untuk masa depan yang lebih baik!
          </p>
          <Link
            href="/login"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
          >
            Login
          </Link>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <Image
            src={HeroImage}
            alt="Logo UPN"
            width={500}
            height={500}
            className="hidden sm:block max-w-full h-auto"
            placeholder="blur"
            blurDataURL="@/assets/images/hero-card-low-res.jpg"
          />
          <Image
            src={HeroImage}
            alt="Logo UPN"
            width={250}
            height={250}
            className="sm:hidden"
            placeholder="blur"
            blurDataURL="@/assets/images/hero-card-low-res.jpg"
          />
        </div>
      </div>
    </section>
  );
}
