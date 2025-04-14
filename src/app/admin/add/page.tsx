/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Input from "@/components/ui/input";
import CardData from "@/components/addPage/card-data";
import Link from "next/link";
import { useActionState } from "react";
import AddElection from "@/app/action/addElection";
import addtest from "@/app/action/addtest";
export default function Add() {
  const [state, AddAction, IsLoading] = useActionState(AddElection, null);
  return (
    <section className=" mt-4 mx-4">
      <div className="space-y-4">
        <h1 className="font-bold text-3xl sm:text-4xl text-center">
          Pusat Bantuan Sistem Pemilu
        </h1>
        <p className=" text-base sm:text-lg text-center ">
          Halaman Ini memberikan Detail Cara menggunakan Website Pemilu Fakulats
          Hukum UPNVJ
        </p>
      </div>

      <form className="flex flex-col gap-4" action={AddAction}>
        <Input
          type="text"
          placeholder="Prabowo & Gibran"
          label="Nama Pemilu"
          name="JudulPemilu"
          required={true}
        />

        <Input type="date" label="Nama Pemilu" name="TanggalPemlilu" />
        <CardData number={1} />
        <CardData number={2} />
        <CardData number={3} />

        <div className="flex gap-4 justify-end ">
          <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-200 ease-in-out w-full sm:w-fit">
            Simpan
          </button>
          <Link
            href={"/admin/home"}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-200 ease-in-out w-full sm:w-fit"
          >
            Batal
          </Link>
        </div>
      </form>
    </section>
  );
}
