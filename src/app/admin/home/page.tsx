import { cookies } from "next/headers";
import AdminHomepage from "@/components/admin/home";
export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const fetchElectionsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        contentType: "application/json",
      },
    }
  );
  const data = await fetchElectionsData.json();
  return <AdminHomepage data={data} />;
}
