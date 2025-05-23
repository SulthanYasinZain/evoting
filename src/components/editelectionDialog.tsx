"use client";
import { useActionState, useEffect, useState } from "react";
import UpdateElection from "@/app/action/updateElection";
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
import { Loader2, Pencil } from "lucide-react";
import formatToInputDate from "@/lib/formatToInputDate";

export default function EditElectionDialog({
  election_id,
  election_name,
  election_date,
}: {
  election_id: string;
  election_name: string;
  election_date: string;
}) {
  const router = useRouter();
  const [state, updateElectionAction, isLoading] = useActionState(
    UpdateElection,
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

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

    setFormData({
      name: election_name,
      date: formatToInputDate(election_date),
    });
  }, [election_name, election_date, state, router]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="border cursor-pointer text-gray-800 rounded-lg px-4 py-2 w-full hover:bg-neutral-200 transition duration-200 flex items-center justify-center">
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Pemilu</DialogTitle>
          <DialogDescription className="text-center">
            Ubah data pemilu sesuai kebutuhan.
          </DialogDescription>
        </DialogHeader>

        <form action={updateElectionAction} className="flex flex-col w-full">
          <input
            type="hidden"
            name="election_id"
            value={election_id}
            readOnly
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            disabled={isLoading}
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
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
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
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
              "Simpan"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
