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
import { Loader2 } from "lucide-react";

export default function VoteConfirmationDialog({
  candidate_id,
  candidate_name,
}: {
  candidate_id: number;
  candidate_name: string;
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
        <button className="w-1/2 hover:bg-red-600 disabled:bg-red-400 bg-red-500 text-white rounded-md p-2 h-10">
          Pilih
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Pemilihan</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin memilih{" "}
            <span className="font-semibold text-black">{candidate_name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 w-full">
          <button
            type="button"
            disabled={isLoading}
            className="w-1/2 border text-sm font-medium text-gray-700 hover:bg-neutral-200 text-center flex items-center justify-center h-10 bg-neutral-100 rounded-md"
          >
            Batalkan
          </button>
          <form action={voteAction} className="w-1/2">
            <input
              className="hidden"
              type="number"
              readOnly
              hidden
              name="candidate_id"
              value={candidate_id}
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
                "Ya, Pilih"
              )}
            </button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
