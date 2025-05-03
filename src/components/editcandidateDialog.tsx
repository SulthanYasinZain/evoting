"use client";
import { useActionState, useEffect, useState } from "react";
import EditCandidate from "@/app/action/editCandidate";
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
import { Loader2, Pencil } from "lucide-react";
import CandidateNumberSelection from "./candidatenumberSelection";

export default function EditCandidateDialog({
  candidate_id,
  candidate_name,
  candidate_number,
  candidate_vision,
  candidate_mission,
  candidate_image_url,
}: {
  candidate_id: string;
  candidate_name: string;
  candidate_number: string;
  candidate_vision: string;
  candidate_mission: string;
  candidate_image_url: string;
}) {
  const router = useRouter();
  const [state, EditCandidateAction, isLoading] = useActionState(
    EditCandidate,
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    vision: "",
    mission: "",
    image_url: "",
  });

  useEffect(() => {
    setFormData({
      name: candidate_name,
      number: candidate_number,
      vision: candidate_vision,
      mission: candidate_mission,
      image_url: candidate_image_url,
    });
    if (state?.success === false) {
      toast.error(state.message);
    } else if (state?.success === true) {
      router.refresh();
      setIsOpen(false);
      setTimeout(() => {
        toast.success(state.message);
      }, 1000);
    }
  }, [
    candidate_mission,
    candidate_name,
    candidate_number,
    candidate_vision,
    candidate_image_url,
    state,
    router,
  ]);

  console.log(candidate_image_url);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="border cursor-pointer w-full text-gray-800  rounded-lg px-4 py-2 hover:bg-neutral-200 transition duration-200 flex items-center justify-center">
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Pemilu</DialogTitle>
          <DialogDescription className="text-center">
            Ubah data pemilu sesuai kebutuhan.
          </DialogDescription>
        </DialogHeader>

        {/* Kontainer konten yang scrollable */}
        <div className="overflow-y-auto flex-1 px-1 space-y-4">
          <form
            action={EditCandidateAction}
            className="flex flex-col w-full space-y-4"
            id="addCandidate"
          >
            <input
              type="hidden"
              name="candidate_id"
              value={candidate_id}
              readOnly
            />

            <ImageUpload candidate_image_url={candidate_image_url} />
            <label htmlFor="title" className="block mb-1 font-medium">
              Nomor Kandidat
            </label>
            <CandidateNumberSelection candidate_number={candidate_number} />

            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Nama Kandidat
              </label>
              <input
                type="text"
                name="name"
                id="name"
                disabled={isLoading}
                className="border border-gray-300 rounded-md p-2 w-full"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="vision" className="block mb-1 font-medium">
                Visi
              </label>
              <textarea
                name="vision"
                id="vision"
                placeholder="Tulis visi kandidat di sini..."
                className="border border-gray-300 rounded-md p-2 w-full min-h-[80px]"
                value={formData.vision}
                onChange={(e) => {
                  setFormData({ ...formData, vision: e.target.value });
                }}
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="description" className="block mb-1 font-medium">
                Deskripsi
              </label>
              <textarea
                name="mission"
                id="mission"
                placeholder="Tulis deskripsi kandidat di sini..."
                className="border border-gray-300 rounded-md p-2 w-full min-h-[80px]"
                value={formData.mission}
                onChange={(e) => {
                  setFormData({ ...formData, mission: e.target.value });
                }}
                required
              ></textarea>
            </div>
          </form>
        </div>

        <div className="sticky bottom-0 bg-white pt-4">
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
