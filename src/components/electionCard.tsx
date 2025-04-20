import { User, Users, Calendar, Clock, Pencil, Vote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteConfirmatinDialog from "./deleteConfirmation";
import EditElectionDialog from "./editelectionDialog";
export default function ElectionCard({
  id,
  title,
  status,
  candidate_count,
  election_date,
  created_at,
  voter_count,
}: {
  id: string;
  title: string;
  status: string;
  candidate_count: string;
  election_date: string;
  created_at: string;
  voter_count: number;
}) {
  return (
    <div key={id} className="bg-white shadow-sm border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Badge
          className={`${
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : status === "closed"
              ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      <div className="flex justify-between items-center mb-4">
        {[
          {
            label: "Kandidat",
            value: candidate_count,
            Icon: User,
          },
          {
            label: "Suara Masuk",
            value: voter_count,
            Icon: Users,
          },
        ].map(({ label, value, Icon }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{label}</p>
              <h3 className="font-semibold text-lg text-gray-800">{value}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="mr-1">Tanggal Pemilihan :</span>
          <span className="text-gray-800 font-medium">{election_date}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          <span className="mr-1">Tanggal Pemilu Dibuat :</span>
          <span className="text-gray-800 font-medium">
            {new Date(created_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="flex w-full gap-3">
          <div className="w-1/2">
            <EditElectionDialog
              election_id={id}
              election_name={title}
              election_date={election_date}
            />
          </div>
          <div className="w-1/2">
            <DeleteConfirmatinDialog election_id={id} election_name={title} />
          </div>
        </div>
        <Link
          href={`/admin/details/${id}`}
          className="border text-gray-800 rounded-lg px-4 py-2 hover:bg-neutral-200 transition duration-200 flex items-center justify-center"
        >
          <Vote className="w-4 h-4 mr-2" />
          Detail
        </Link>
      </div>
    </div>
  );
}
