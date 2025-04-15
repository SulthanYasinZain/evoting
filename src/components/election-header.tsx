"use client";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ElectionHeaderProps = {
  title: string;
  dateRange: string;
  hasVoted: boolean;
  isActive: boolean;
};

export default function ElectionHeader({
  title,
  dateRange,
  hasVoted,
  isActive,
}: ElectionHeaderProps) {
  if (!isActive) return null;

  return (
    <div className="mb-6 space-y-4">
      {hasVoted ? (
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-green-800 font-medium">
            Thank you for participating in the election! Your vote has been
            recorded.
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-700" />
            <span className="text-gray-700 font-medium">{title}</span>
            <span className="text-gray-500 text-sm">{dateRange}</span>
          </div>

          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </Badge>
        </div>
      )}
    </div>
  );
}
