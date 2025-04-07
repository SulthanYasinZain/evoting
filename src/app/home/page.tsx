import CandidateCard from "@/components/candidate-card";
import NoAvaiableElection from "@/components/no-avaiable-election";
import Alert from "@/components/alert";
export default function Home() {
  const IsAvaible = true;
  return (
    <section className="mx-4 flex flex-col items-center justify-center h-[90svh] bg-background gap-4">
      <Alert variant={"success"} />
      {IsAvaible ? (
        <div className="h-full flex gap-4">
          <CandidateCard />
          <CandidateCard />
        </div>
      ) : (
        <NoAvaiableElection />
      )}
    </section>
  );
}
