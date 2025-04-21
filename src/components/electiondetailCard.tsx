/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Vote as VoteIcon } from "lucide-react";
import { Flag, CheckCircle, Calendar, Users } from "lucide-react";

export default function ElectionDetailCard({
  electionDetail,
}: {
  electionDetail: any;
}) {
  return (
    <div className="border rounded p-4">
      <div className="flex justify-evenly">
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 mb-1">
            <Flag className="h-4 w-4 text-gray-500" />
            <p className="text-gray-500 text-sm font-medium">Nama Pemilihan</p>
          </div>
          <h2 className="text-gray-800 text-xl font-semibold">
            {electionDetail.data.title}
          </h2>
        </div>
        <div className="hidden md:block w-px bg-gray-200 h-16 self-center mx-1"></div>
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 mb-1">
            <CheckCircle className="h-4 w-4 text-gray-500" />
            <p className="text-gray-500 text-sm font-medium">
              Status Pemilihan
            </p>
          </div>
          <h2 className="text-gray-800 text-xl font-semibold">
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
          </h2>
        </div>
        <div className="hidden md:block w-px bg-gray-200 h-16 self-center mx-1"></div>
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 mb-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <p className="text-gray-500 text-sm font-medium">
              Tanggal Pemilihan
            </p>
          </div>
          <h2 className="text-gray-800 text-xl font-semibold">
            {electionDetail.data.election_date}
          </h2>
        </div>
        <div className="hidden md:block w-px bg-gray-200 h-16 self-center mx-1"></div>
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 mb-1">
            <Users className="h-4 w-4 text-gray-500" />
            <p className="text-gray-500 text-sm font-medium">Jumlah Kandidat</p>
          </div>
          <h2 className="text-gray-800 text-xl font-semibold">
            {electionDetail.data.candidate_count}
          </h2>
        </div>
        <div className="hidden md:block w-px bg-gray-200 h-16 self-center mx-1"></div>
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 mb-1">
            <VoteIcon className="h-4 w-4 text-gray-500" />
            <p className="text-gray-500 text-sm font-medium">
              Jumlah Suara Masuk
            </p>
          </div>
          <h2 className="text-gray-800 text-xl font-semibold">
            {electionDetail.data.voter_count}
          </h2>
        </div>
      </div>
    </div>
  );
}
