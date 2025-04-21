"use client";
import { useActionState, useEffect, useState } from "react";
import AddElection from "@/app/action/addElection";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, CirclePlus } from "lucide-react";

export default function AddElectionDialog() {
  const router = useRouter();
  const [state, addElectionAction, isLoading] = useActionState(
    AddElection,
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state?.success === false) {
      toast.error(state.message);
    } else if (state?.success === true) {
      router.refresh();
      setIsOpen(false);
      setTimeout(() => {
        toast.success(state.message);
      }, 1000);
    }
  }, [state, router]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="border cursor-pointer bg-red-500 text-white rounded-lg px-4 py-2 h-fit w-fit hover:bg-red-700 transition duration-200 flex items-center justify-center">
          <CirclePlus className="w-4 h-4 mr-2" />
          Buat Pemilu
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Buat Pemilu Baru</DialogTitle>
          <DialogDescription className="text-center">
            Masukan Data Pemilu Baru
          </DialogDescription>
        </DialogHeader>

        <form action={addElectionAction} className="flex flex-col w-full">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            disabled={isLoading}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 mb-4"
            required
          />
          <label htmlFor="Date">Date</label>
          <input
            type="date"
            name="date"
            id="Date"
            disabled={isLoading}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 mb-4"
            required
          />
          <button
            disabled={isLoading}
            type="submit"
            className="w-full px-6 py-2 hover:bg-red-600 disabled:bg-red-400 bg-red-500 text-white rounded-md p-2 h-10"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Simpan"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
