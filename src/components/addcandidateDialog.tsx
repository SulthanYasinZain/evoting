"use client";
import { useActionState, useEffect, useState } from "react";
import AddCandidate from "@/app/action/addCandidate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUpload from "./imageUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, CirclePlus } from "lucide-react";
import CandidateNumberSelection from "./candidatenumberSelection";

export default function AddCandidateDialog({
  election_id,
}: {
  election_id: string;
}) {
  const router = useRouter();
  const [state, AddCandidateAction, isLoading] = useActionState(
    AddCandidate,
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
        <button className="border cursor-pointer w-fit text-white bg-red-500 rounded-lg px-4 py-2 hover:bg-red-700 transition duration-200 flex items-center justify-center">
          <CirclePlus className="w-4 h-4 mr-2" />
          Tambah Kandidat
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center">
            Tambah Kandidat Baru
          </DialogTitle>
          <DialogDescription className="text-center">
            Masukan data kandidat untuk pemilihan ini.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-150px)] px-1 py-4">
          <form
            action={AddCandidateAction}
            className="flex flex-col w-full space-y-4"
            id="addCandidate"
          >
            <input
              type="hidden"
              name="election_id"
              value={election_id}
              readOnly
            />

            <ImageUpload />

            <div className="mt-4">
              <label
                htmlFor="candidate_number"
                className="block mb-1 font-medium"
              >
                Nomor Kandidat
              </label>
              <CandidateNumberSelection />
            </div>

            <div className="mt-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Nama Kandidat
              </label>
              <input
                type="text"
                name="name"
                id="name"
                disabled={isLoading}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="vision" className="block mb-1 font-medium">
                Visi
              </label>
              <textarea
                name="vision"
                id="vision"
                placeholder="Tulis visi kandidat di sini..."
                className="border border-gray-300 rounded-md p-2 w-full min-h-[80px]"
              ></textarea>
            </div>

            <div className="mt-4">
              <label htmlFor="mission" className="block mb-1 font-medium">
                Deskripsi
              </label>
              <textarea
                name="mission"
                id="mission"
                placeholder="Tulis deskripsi kandidat di sini..."
                className="border border-gray-300 rounded-md p-2 w-full min-h-[80px]"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="sticky bottom-0 bg-white pt-4 border-t mt-2">
          <button
            disabled={isLoading}
            type="submit"
            form="addCandidate"
            className="w-full hover:bg-red-600 disabled:bg-red-400 bg-red-500 text-white rounded-md p-2 h-10"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
