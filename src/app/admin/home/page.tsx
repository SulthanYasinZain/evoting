// app/admin/home/page.tsx
import { cookies } from "next/headers";
import AdminHomepage from "@/components/admin/adminHomepage";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import {
  Calendar,
  CheckCircle,
  CirclePlus,
  Clock,
  Search,
  XCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuthToken } from "@/lib/auth";

type FilterType = "all" | "active" | "closed" | "upcoming";

const filterIcons: Record<FilterType, React.ReactNode> = {
  all: <Calendar className="h-4 w-4" />,
  active: <CheckCircle className="h-4 w-4" />,
  closed: <XCircle className="h-4 w-4" />,
  upcoming: <Clock className="h-4 w-4" />,
};

async function AdminPage() {
  const token = await getAuthToken();
  if (!token) {
    redirect("/login");
  }

  let electionData = [];

  const electionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/elections`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const rawElectionData = await electionRes.json();

  if (!electionRes.ok) {
    if (
      rawElectionData.message === "User does not have the right roles." ||
      rawElectionData.message === "Unauthenticated."
    ) {
      redirect("/api/logout");
    }
    console.error("API responded with non-OK status:", electionRes.status);
  }
  electionData = rawElectionData.data;

  return <AdminHomepage data={electionData} />;
}

function Loading() {
  const defaultSelectedFilter: FilterType = "all";

  return (
    <section className="flex flex-col  w-full px-4 h-auto min-h-[89svh]">
      <h1 className="text-gray-800 font-semibold text-2xl mt-2">
        Selamat Datang, Admin!
      </h1>
      <p className="text-gray-500 text-lg my-2 ">
        Buat, lihat, dan edit pemilu disini
      </p>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="w-full md:max-w-sm space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search />
            </span>
            <input
              type="text"
              name="search"
              placeholder="Cari Disini"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 w-full">
            {["all", "active", "closed", "upcoming"].map((type) => (
              <label
                key={type}
                htmlFor={type}
                className={`text-center cursor-pointer px-2 py-2 rounded-md border text-sm transition-all w-full
            ${
              defaultSelectedFilter === type
                ? "bg-red-500 text-white" // Styles for the 'all' filter (default selected)
                : "bg-white text-black border hover:bg-neutral-200" // Styles for other filters
            }`}
              >
                <input
                  type="radio"
                  id={type}
                  name="filter"
                  value={type}
                  className="hidden"
                  checked={defaultSelectedFilter === type}
                  readOnly
                />
                <span className="flex md:hidden justify-center">
                  {filterIcons[type as FilterType]}
                </span>
                <span className="hidden md:block">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <button className="border cursor-pointer bg-red-500 text-white rounded-lg px-4 py-2 h-fit w-fit hover:bg-red-700 transition duration-200 flex items-center justify-center">
            <CirclePlus className="w-4 h-4 mr-2" />
            Buat Pemilu
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="bg-white shadow-sm border rounded-lg p-6" key={i}>
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-8 w-2/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-24 mb-1" />
                  <Skeleton className="h-6 w-16 mb-1" />
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Skeleton className="h-4 w-full mr-2" />
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Skeleton className="h-4 w-full mr-2" />
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <div className="flex w-full gap-3">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-10 w-1/2" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminPage />
    </Suspense>
  );
}
