import Image from "next/image";

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
  console.log(data);
  return <section className="h-[90svh]">ini Home</section>;
}
