import CandidateDetailsPage from "@/components/candidate-page";
import { cookies } from "next/headers";

interface PageProps {
  params: { id: string };
}

export default async function CandidateDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const candidateDetailRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const candidateDetail = await candidateDetailRes.json();

  return (
    <>
      <CandidateDetailsPage Data={candidateDetail} />
    </>
  );
}
