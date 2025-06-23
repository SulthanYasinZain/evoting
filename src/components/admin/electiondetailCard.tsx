/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Vote as VoteIcon } from "lucide-react";
import { Flag, CheckCircle, Calendar, Users } from "lucide-react";

export default function ElectionDetailCard({
  electionDetail,
}: {
  electionDetail: any;
}) {
  const statItems = [
    {
      icon: <Flag className="h-4 w-4 text-gray-500" />,
      label: "Nama Pemilihan",
      value: electionDetail.data.title,
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-gray-500" />,
      label: "Status Pemilihan",
      value: (
        <Badge
          className={
            electionDetail.data.status === "active"
              ? "bg-emerald-500"
              : electionDetail.data.status === "closed"
              ? "bg-gray-500"
              : "bg-blue-500"
          }
        >
          {electionDetail.data.status}
        </Badge>
      ),
    },
    {
      icon: <Calendar className="h-4 w-4 text-gray-500" />,
      label: "Tanggal Pemilihan",
      value: electionDetail.data.election_date,
    },
    {
      icon: <Users className="h-4 w-4 text-gray-500" />,
      label: "Jumlah Kandidat",
      value: electionDetail.data.candidate_count,
    },
    {
      icon: <VoteIcon className="h-4 w-4 text-gray-500" />,
      label: "Jumlah Suara Masuk",
      value: electionDetail.data.voter_count,
    },
  ];

  return (
    <div className="border rounded p-4">
      {/* Mobile view - grid layout */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center items-center gap-1 mb-1">
              {item.icon}
              <p className="text-gray-500 text-xs font-medium">{item.label}</p>
            </div>
            <div className="text-gray-800 text-lg font-semibold">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - original layout */}
      <div className="hidden md:flex justify-evenly">
        {statItems.map((item, index) => (
          <>
            <div key={`item-${index}`} className="text-center">
              <div className="flex justify-center items-center gap-1 mb-1">
                {item.icon}
                <p className="text-gray-500 text-sm font-medium">
                  {item.label}
                </p>
              </div>
              <h2 className="text-gray-800 text-xl font-semibold">
                {item.value}
              </h2>
            </div>
            {index < statItems.length - 1 && (
              <div className="w-px bg-gray-200 h-16 self-center mx-1"></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
