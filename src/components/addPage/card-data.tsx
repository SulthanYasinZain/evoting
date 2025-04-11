import ImageInput from "@/components/addPage/image-input";
import Input from "@/components/ui/input";

export default function CardData() {
  return (
    <div className="flex flex-col w-full h-fit rounded-lg border border-[#A0A0A0] p-4 gap-4">
      <h1 className="text-xl sm:text-3xl font-semibold ">Kandidat 1</h1>
      <div className="flex flex-col h-full sm:flex-row gap-4 justify-between items-start">
        <div className="sm: flex gap-4 w-full">
          <ImageInput />
          <div className="flex flex-col justify-evenly w-full">
            <Input
              type="text"
              placeholder="Prabowo & Gibran"
              label="Nama Kandidat"
              name="Pemlilu"
            />
            <div>
              <label htmlFor="">Visi Kandidat</label>
              <textarea
                rows={2}
                className="resize-none leading-relaxed border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border focus:border-foreground w-full"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <label htmlFor="">Deskripsi</label>
      <textarea
        rows={3}
        className="resize-none leading-relaxed border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border focus:border-foreground w-full"
      ></textarea>
    </div>
  );
}
