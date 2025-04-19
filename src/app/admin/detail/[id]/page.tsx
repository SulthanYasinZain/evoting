import { cookies } from "next/headers";
import EditDialog from "@/components/edit-dialog";
import DashboardManagement from "@/components/dashboard-management";

type Candidate = {
  id: number;
  election_id: number;
  number: string;
  name: string;
  vision: string;
  mission: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

interface PageProps {
  params: { id: string };
}

export default async function ElectionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

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
    (candidate: Candidate) => candidate.election_id === Number(id)
  );

  console.log(electionDetail);
  console.log("Filtered:", filteredCandidates);

  return (
    <DashboardManagement
      electionDetails={electionDetail.data}
      candidates={filteredCandidates}
      electionId={id} // Pass the election ID here
    />
  );
}
