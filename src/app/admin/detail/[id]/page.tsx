/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { Suspense } from "react";
import LoadingState from "@/components/loadingState";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ElectionDetailCard from "@/components/electiondetailCard";
import AddCandidateDialog from "@/components/addcandidateDialog";
import Image from "next/image";
import DeleteCandidateDialog from "@/components/deletecandidateDialog";
import EditCandidateDialog from "@/components/editcandidateDialog";
// import { BarChartVertical } from "@/components/barChart";
// import { LineChartMultiple } from "@/components/lineChart";
import { redirect } from "next/navigation";
async function AdminDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await params;

  const electionDetailRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const electionDetail = await electionDetailRes.json();
  if (
    electionDetail.message === "Unauthorized" ||
    electionDetail.message === "User does not have the right roles."
  ) {
    redirect("/api/logout");
  }

  if (electionDetail.message === "Election not found") {
    return <p>Not found</p>;
  }

  const candidatesListRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const candidatesList = await candidatesListRes.json();
  const candidatesListData = candidatesList.data || [];

  const filteredCandidates = candidatesListData.filter(
    (candidate: any) => candidate.election_id === Number(id)
  );
  console.log("filteredData", filteredCandidates);
  return (
    <section className="flex flex-col w-full px-4 h-auto min-h-[89svh]">
      <Link
        href={"/admin/home"}
        className="flex items-center w-fit p-2 rounded gap-2 hover:bg-neutral-200 text-gray-700"
      >
        <ArrowLeft className="h-5 w-5" /> <span>Kembali Ke Beranda</span>
      </Link>
      <ElectionDetailCard electionDetail={electionDetail} />
      <div className="flex justify-between items-center w-full ">
        <h2 className="text-gray-800 font-semibold text-2xl mt-8 mb-4">
          Daftar Kandidat
        </h2>
        {filteredCandidates.length < 3 && (
          <AddCandidateDialog election_id={id} />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full  mt-6">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate: any) => (
            <div
              key={candidate.id}
              className="border rounded-xl p-4 bg-white shadow-md flex flex-col"
            >
              <div className="flex-grow flex flex-col items-center">
                <Image
                  src={
                    candidate.photo_url || "https://placehold.co/400x200.png"
                  }
                  alt={candidate.name}
                  width={400}
                  height={200}
                  className="rounded-lg mb-2"
                  style={{ objectFit: "cover", flexShrink: 0 }}
                />
                <h3 className="text-lg font-semibold text-center mt-2 line-clamp-1">
                  {candidate.name}
                </h3>
                <p className="text-gray-600 text-center mb-4 line-clamp-2">
                  {candidate.vision}
                </p>
              </div>

              <div className="flex justify-center gap-2 w-full mt-auto pt-4 border-t">
                <EditCandidateDialog
                  candidate_id={candidate.id}
                  candidate_name={candidate.name}
                  candidate_number={candidate.number}
                  candidate_vision={candidate.vision}
                  candidate_mission={candidate.mission}
                  candidate_image_url={candidate.image_url}
                />
                <DeleteCandidateDialog candidate_id={candidate.id} />
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">
            Tidak ada kandidat untuk pemilihan ini.
          </p>
        )}
      </div>

      {/* <h2>Detail Grafik</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-6">
        <BarChartVertical />
      </div>
      <LineChartMultiple /> */}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<LoadingState />}>
      <AdminDetailPage params={Promise.resolve(resolvedParams)} />
    </Suspense>
  );
}
