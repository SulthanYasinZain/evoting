"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import AddElectionDialog from "@/components/add-election-dialog";
import DeleteAlert from "./delete-alert";
import { Calendar, Search, Users, BarChart3 } from "lucide-react";

type electionData = {
  id: string;
  title: string;
  election_date: string;
  status: string;
  candidate_count: number;
  voter_count: number;
  created_at: string;
  updated_at: string;
};

export default function ElectionManagement({
  electionData,
}: {
  electionData: electionData[] | undefined;
}) {
  const [activeTab, setActiveTab] = useState("all");
  console.log(electionData);
  const list = Array.isArray(electionData) ? electionData : [];

  const filteredElections =
    activeTab === "all"
      ? list
      : list.filter((election) => election.status === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">MANAJEMEN PEMILU</h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input className="pl-10" placeholder="Search" />
        </div>

        <AddElectionDialog />
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredElections.map((election) => (
          <Card key={election.id} className="border rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold">{election.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {election.election_date}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <Badge
                  className={` ${
                    election.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : ""
                  }${
                    election.status === "closed"
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      : ""
                  } ${
                    election.status === "upcoming"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : ""
                  } `}
                >
                  {election.status.charAt(0).toUpperCase() +
                    election.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Kandidat</div>
                    <div className="text-lg font-bold">
                      {election.candidate_count}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Votes</div>
                    <div className="text-lg font-bold">
                      {election.voter_count}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                created by {election.created_at}
              </div>
            </CardContent>

            <CardFooter className="flex gap-4 justify-between p-4 pt-0 border-t border-gray-100">
              <Link
                href={`/admin/detail/${election.id}`}
                className="flex-1 border rounded p-2 text-center"
              >
                Details
              </Link>
              <DeleteAlert id={election.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
