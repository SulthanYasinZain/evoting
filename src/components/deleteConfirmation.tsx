"use client";
import { useActionState, useEffect } from "react";
import Vote from "@/app/action/vote";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteConfirmatinDialog({
  election_id,
  election_name,
}: {
  election_id: string;
  election_name: string;
}) {
  const [state, voteAction, isLoading] = useActionState(Vote, null);
  useEffect(() => {
    if (state?.success === false) {
      toast.error(state.message);
    }
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border border-red-200 w-full  text-red-500 rounded-lg px-4 py-2 hover:bg-red-100 transition duration-200 flex items-center justify-center">
          <Trash2 className="w-4 h-4 mr-2" />
          Hapus
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Hapus Pemilu</DialogTitle>
          <DialogDescription>
            Kamu akan menghapus pemilu{" "}
            <span className="font-semibold text-black">{election_name}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
          <form action={voteAction} className="flex w-full">
            <input
              className="hidden"
              type="number"
              readOnly
              hidden
              name="election_id"
              value={election_id}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="w-full hover:bg-red-600 disabled:bg-red-400 bg-red-500 text-white rounded-md p-2 h-10"
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                "Ya, Hapus"
              )}
            </button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
