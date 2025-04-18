"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function EditDialog() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState({
    id: "1",
    name: "John Doe",
    position: "President",
    description: "Candidate for President",
    image: "/placeholder.svg",
  });
  return (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
        </DialogHeader>

        {currentCandidate && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image
                  src={currentCandidate.image || "/placeholder.svg"}
                  alt={currentCandidate.name}
                  fill
                  className="object-cover"
                />
              </div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={currentCandidate.name}
                onChange={(e) =>
                  setCurrentCandidate({
                    ...currentCandidate,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={currentCandidate.position}
                onChange={(e) =>
                  setCurrentCandidate({
                    ...currentCandidate,
                    position: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentCandidate.description}
                onChange={(e) =>
                  setCurrentCandidate({
                    ...currentCandidate,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
