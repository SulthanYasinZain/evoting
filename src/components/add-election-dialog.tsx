"use client";
import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import addNewElection from "@/app/action/add-new-election";

export default function AddElectionDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(addNewElection, null);

  // Handle form submission result
  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message);
        setOpen(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pemilu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Election</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Election Name</Label>
            <Input id="title" name="title" placeholder="Enter election name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="election_date">Election Date</Label>
            <Input id="election_date" name="date" type="date" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
