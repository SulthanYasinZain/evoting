"use client";
import Image from "next/image";
export default function Add() {
  return (
    <section>
      <h1>Tambah Kandidat</h1>
      <form>
        <span className="flex flex-col gap-2">
          <label htmlFor="">Judul Pemilu</label>
          <input
            type="text"
            className="border border-[#A0A0A0]"
            placeholder="judul"
          ></input>
        </span>
        <span className="flex flex-col gap-2">
          <label htmlFor="">Tangal Pemilu</label>
          <input
            type="text"
            className="border border-[#A0A0A0]"
            placeholder="Tanggal"
          ></input>
        </span>
      </form>

      <div className="border border-[#A0A0A0] rounded mt-2">
        <div className="rounded p-4 border m-12">
          <span className="flex">
            <Image
              src="https://placehold.co/300x200"
              height={200}
              width={200}
              alt="asd"
            />
            <div className="flex flex-col w-full">
              <span className="flex flex-col gap-2">
                <label htmlFor="">Judul Pemilu</label>
                <input
                  type="text"
                  className="border border-[#A0A0A0]"
                  placeholder="judul"
                ></input>
              </span>
              <span className="flex flex-col gap-2">
                <label htmlFor="">Tangal Pemilu</label>
                <input
                  type="text"
                  className="border border-[#A0A0A0]"
                  placeholder="Tanggal"
                ></input>
              </span>
            </div>
          </span>
          <label htmlFor="">Deskrisi</label>
          <textarea placeholder="teks"></textarea>
        </div>
      </div>
    </section>
  );
}
