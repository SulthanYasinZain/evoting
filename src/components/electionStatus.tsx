import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export default function ElectionStatus({
  title,
  time,
  hasVoted = false,
}: {
  title?: string;
  time?: string;
  hasVoted?: boolean;
}) {
  const timeLeft = time || "0 Jam 0 Menit";
  const electionTitle = title || "Pemilihan Umum Mahasiswa";
  return (
    <div className="w-full space-y-4">
      {hasVoted ? (
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-green-800 font-medium">
            Terimakasih atas partisipasi anda dalam pemilihan ini. Suara anda
            sangat berarti bagi kami.
          </p>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium">
                  {electionTitle}
                </span>
              </div>
              <span className="text-gray-500 text-sm">{timeLeft}</span>
            </div>
            <div className="mt-2 sm:mt-0">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                Active
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
