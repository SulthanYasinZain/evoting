import Image from "next/image";
import Question from "@/assets/images/question.svg";

export default function Test() {
  return (
    <div className="h-fit w-fit border p-4">
      <Image src={Question} alt="question" width={200} height={200} />
      <h1 className="text-4xl font-semibold">Ingin Menghapus?</h1>
      <p>pemilu yang dihapus tidak bisa dikemablikan</p>
      <div className="flex gap-4 justify-center">
        <button className="w-1/2 bg-red-200">Cancel</button>
        <button className="w-1/2 bg-accent">Hapus</button>
      </div>
    </div>
  );
}
