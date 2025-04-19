"use client";

import { Button } from "@/components/ui/button";
import EditDialog from "./edit-dialog";
import { useState } from "react";
import {
  Calendar,
  Clock,
  House,
  Plus,
  Trash2,
  Users,
  BarChart3,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddCandidateDialog from "@/components/add-candidate-dialog"; // Adjust the import path based on your file structure

type Candidate = {
  id: number;
  election_id: number;
  number: string;
  name: string;
  vision: string;
  mission: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

type ElectionDetails = {
  id: number;
  title: string;
  election_date: string;
  status: "active" | "closed" | "upcoming";
  candidate_count: number;
  voter_count: number;
  created_at: string;
  updated_at: string;
};

export default function DashboardManagement({
  electionDetails,
  candidates,
}: {
  electionDetails: ElectionDetails;
  candidates: Candidate[];
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<any>({});
  const totalVotes = candidates.length * 0; // placeholder

  const handleSaveCandidate = () => {
    setEditDialogOpen(false); // Close the dialog after saving
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex-col">
            <div className="flex gap-4">
              <h1 className="font-bold text-4xl">Dashboard </h1>
              <p className="text-4xl">-</p>
              <h1 className="font-semibold text-4xl">
                {electionDetails.title}
              </h1>
            </div>
            <p className="text-gray-500">
              Dibuat oleh Admin - {electionDetails.created_at.split("T")[0]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={"/admin/home"}>
                <House className="h-4 w-4" />
                Go back
              </Link>
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" color="white" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              Election Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge className="bg-green-100 text-green-800 capitalize">
                  {electionDetails.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Date</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.election_date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Time</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span>08:00 - 17:00</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Votes</span>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.voter_count}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Candidates</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.candidate_count}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              Election Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge className="bg-green-100 text-green-800 capitalize">
                  {electionDetails.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Date</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.election_date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Time</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span>08:00 - 17:00</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Votes</span>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.voter_count}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Candidates</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.candidate_count}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              Election Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge className="bg-green-100 text-green-800 capitalize">
                  {electionDetails.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Date</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.election_date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Time</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span>08:00 - 17:00</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Votes</span>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.voter_count}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Candidates</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{electionDetails.candidate_count}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates */}
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">
                Candidate #{candidate.number}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{candidate.name}</h3>
                <p className="text-sm text-gray-500">{candidate.vision}</p>
                <p className="text-sm text-gray-500">{candidate.mission}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => setEditDialogOpen(true)}
                variant={"outline"}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="ml-2"
                onClick={() => {
                  setCurrentCandidate(candidate);
                  setEditDialogOpen(true);
                }}
              >
                <Trash2 />
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card
          onClick={() => setEditDialogOpen(true)} // Open the AddCandidateDialog when clicked
          className="border-dashed border-2 flex flex-col items-center justify-center h-[250px] cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Plus className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-gray-500 font-medium">Add New Candidate</p>
        </Card>

        {/* Add Candidate Dialog */}
        <AddCandidateDialog
          editDialogOpen={editDialogOpen}
          setEditDialogOpen={setEditDialogOpen}
          currentCandidate={currentCandidate}
          setCurrentCandidate={setCurrentCandidate}
          handleSaveCandidate={handleSaveCandidate}
        />
      </div>
    </div>
  );
}
