import CandidateCard from "@/components/candidate-card";
import NoAvaiableElection from "@/components/no-avaiable-election";
import Alert from "@/components/alert";
import { cookies } from "next/headers";
import { AnimatedList } from "@/components/magicui/animated-list";
export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const fetchCandidates = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // const isEligible = await fetch(1`${process.env.NEXT_PUBLIC_API_URL}/is-eligible`, {)

  console.log(
    "Candidates Response:",
    JSON.parse(JSON.stringify(fetchCandidates))
  );

  return (
    <section className="mx-4 flex flex-col items-center justify-center h-[90svh] bg-background gap-4">
      <Alert variant={"success"} />
      {Object.keys(fetchCandidates).length ? (
        <div className="h-full flex gap-4">
          <CandidateCard />
          <CandidateCard />
        </div>
      ) : (
        <NoAvaiableElection />
      )}

      <AnimatedList>
        <div className="p-4"></div>
      </AnimatedList>
    </section>
  );
}
