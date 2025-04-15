import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import image from "@/app/assets/images/hero-card.png";

export default async function Home() {
  const activeElection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/current-election`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const data = await activeElection.json();
  return (
    <div className="flex h-[calc(100dvh-5rem)] items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center">
          {/* Left Column */}
          <div className="flex flex-col space-y-6 md:w-1/2">
            {data.message === "No active election found" ? null : (
              <Badge
                variant="outline"
                className="w-fit bg-gray-100 text-gray-800 px-3 py-1 rounded-full border-gray-200"
              >
                <span className="mr-2">Pemilihan Ketua BEM 2025</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              </Badge>
            )}

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Website Pemilu Fakultas Hukum UPNVJ
            </h1>

            <p className="text-gray-600 text-lg">
              Ayo sukseskan pemilu yang jujur, adil, dan rahasia, di mana setiap
              suara berharga untuk masa depan yang lebih baik!
            </p>

            <Link
              href={"/login"}
              className="w-fit px-8 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white"
            >
              Login
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <Image
              src={image}
              alt="Voting Image"
              width={500}
              height={500}
              className="hidden sm:block max-w-full h-auto"
            />
            <Image
              src={image}
              alt="Voting Image"
              width={300}
              height={300}
              className="sm:hidden w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
