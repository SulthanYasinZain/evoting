import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await params;

  const candidateDetailRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates/${id}`,
    {
      next: { revalidate: 60 },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const candidateDetail = await candidateDetailRes.json();

  return (
    <section className="flex flex-col w-full px-4 py-6 h-auto min-h-[90svh]">
      {/* Back button with consistent spacing */}
      <Link
        href={"/homepage"}
        className="flex items-center w-fit p-2 rounded gap-2 hover:bg-neutral-200 text-gray-700"
      >
        <ArrowLeft className="h-5 w-5" /> <span>Kembali Ke Beranda</span>
      </Link>

      {/* Candidate header card with consistent padding */}
      <div className="flex flex-col sm:flex-row w-full items-center bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-lg mt-6 gap-6">
        <Image
          src={"https://placehold.co/800x400.png"}
          alt="Candidate Image"
          width={800}
          height={400}
          className="rounded-xl"
        />

        <div className="space-y-3">
          <Badge variant="secondary" className="mb-2">
            Kandidat {candidateDetail.data.number}
          </Badge>
          <h1 className="text-4xl font-semibold">
            {candidateDetail.data.name}
          </h1>
          <p className="text-xl">{candidateDetail.data.vision}</p>
        </div>
      </div>

      {/* Description section with consistent spacing */}
      <h2 className="text-gray-800 font-semibold text-2xl mt-8 mb-4">
        Deskripsi Kandidat
      </h2>

      <div className="text-gray-700 text-lg border rounded-lg p-6">
        <p className="mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi optio
          commodi, ratione corrupti ut vero inventore voluptatem non libero hic!
          Laboriosam quam perspiciatis cupiditate, ab quo voluptatibus vel eius
          architecto perferendis quasi eaque repudiandae reiciendis?
          Voluptatibus, aliquid alias! Vero earum maiores libero labore unde
          impedit ex incidunt ab cum explicabo, sunt atque aliquid a rerum quod
          nisi voluptatibus hic quaerat dolores mollitia, possimus ratione
          cumque ut?
        </p>

        <p className="mb-4">
          Cumque totam voluptatibus ut rem maxime sunt cum. Nam assumenda quas
          facere, dolorum deleniti ducimus ratione totam, similique laudantium
          enim neque hic labore sed eaque consequuntur reprehenderit obcaecati
          esse quaerat tempora deserunt praesentium. Perferendis. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Fuga amet culpa,
          assumenda obcaecati voluptas dolor libero beatae nihil, nulla sunt,
          expedita non? Laboriosam dolores, beatae animi sapiente consequatur
          optio voluptatem impedit laborum sed, doloribus nemo est commodi
          maiores architecto, dolorum molestias nesciunt odio exercitationem
          repellat vitae harum facere vel. Iure?
        </p>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
          maiores perferendis reprehenderit, libero, dolore blanditiis tempore
          modi repudiandae soluta facere, eum corporis. Consequuntur libero enim
          quisquam dolore illum molestias magnam itaque mollitia laudantium
          ipsa, asperiores rem soluta culpa eligendi, eum voluptatum! Sed
          excepturi quisquam ab ipsa eveniet aperiam vero ullam?
        </p>
      </div>

      {/* Confirmation and button with consistent spacing */}
      <div className="flex border rounded-lg p-6 mt-6 mb-6">
        <Link
          href={"/homepage"}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-center p-4 rounded-md font-medium transition-colors"
        >
          Selesai
        </Link>
      </div>
    </section>
  );
}
