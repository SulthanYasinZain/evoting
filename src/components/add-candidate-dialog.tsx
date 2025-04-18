"use client";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddNewCandidate from "@/app/action/add-new-candidates";

// Define an interface for the component's props
interface Candidate {
  id: string | number; // Assuming an ID exists
  image?: string | null;
  name: string;
  position: string;
  description: string;
}

interface AddCandidateDialogProps {
  editDialogOpen: boolean;
  electionId: any;
  setEditDialogOpen: (open: boolean) => void;
  currentCandidate: Candidate | null;
  setCurrentCandidate: (
    candidate: Candidate | null | ((prev: Candidate | null) => Candidate | null)
  ) => void;
  handleSaveCandidate: () => void;
}

export default function AddCandidateDialog({
  editDialogOpen,
  setEditDialogOpen,
  currentCandidate,
  setCurrentCandidate,
  handleSaveCandidate,
  electionId,
}: AddCandidateDialogProps) {
  const [state, addCandidateAction, isLoading] = useActionState(
    AddNewCandidate,
    null
  );
  // Helper function to update candidate state safely
  const updateCandidateField = (field: keyof Candidate, value: string) => {
    if (currentCandidate) {
      setCurrentCandidate({
        ...currentCandidate,
        [field]: value,
      });
    }
  };

  return (
    // Pass the setEditDialogOpen function to onOpenChange
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          {/* Title should probably reflect if it's Add or Edit */}
          <DialogTitle>Add Candidate</DialogTitle>
        </DialogHeader>

        {/* Check if currentCandidate exists before rendering the form */}
        {currentCandidate && (
          <form action={addCandidateAction} className="space-y-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image
                  // Provide a default placeholder if image is null/undefined
                  src={currentCandidate.image || "/placeholder.svg"}
                  alt={currentCandidate.name || "Candidate"}
                  fill
                  className="object-cover"
                />
              </div>
              <Input
                type="text"
                name="election_Id"
                value={electionId}
                readOnly
                hidden
              />

              <Input type="number" name="number" />
              <Input
                type="file"
                placeholder="Add Photo"
                name="image_url"
                accept="image/*"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision">Vision</Label>
              <Input id="vision" name="vision" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentCandidate.description}
                name="mission"
                onChange={(e) =>
                  updateCandidateField("description", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                // Use the passed setEditDialogOpen function to close the dialog
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </Button>
              {/* Use the passed handleSaveCandidate function */}
              <Button onClick={handleSaveCandidate}>Save Changes</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
