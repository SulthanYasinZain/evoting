"use client";

import Image from "next/image";
import Logo from "@/assets/images/Logo-upnvj.png";
import login from "../action/login";
import { useActionState } from "react";
import { AnimatedList } from "@/components/magicui/animated-list";

export default function Login() {
  const [state, loginAction, isLoading] = useActionState(login, null);
  return (
    <section className="mx-4 flex h-[85svh] items-center justify-center">
      <form
        action={loginAction}
        className=" bg-background  flex flex-col justify-between w-[350px] h-[400px] p-4 gap-4 rounded-lg shadow-md"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src={Logo} alt="Logo UPNVJ" width={50} height={50} />
          <h1 className="text-2xl font-semibold text-center">
            Website Pemilu Fakultas Hukum UPNVJ
          </h1>
          <p className="text-[#666666]">Login Untuk Melanjutkan</p>
        </div>
        <div className="flex flex-col">
          <label>email</label>
          <input
            type="email"
            placeholder="email@upnvj.ac.id"
            name="email"
            className="border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border-2 focus:border-foreground"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Masukan Password"
            className="border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border-2 focus:border-foreground"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-primary hover:bg-[#b21717] active:bg-[#9e1515] text-background p-2 rounded-lg hover:cursor-pointer"
        >
          {isLoading ? "Loading" : "Login"}
        </button>
      </form>
      <AnimatedList className="absolute right-4 bottom-4">
        {state && (
          <div className="p-4 bg-blue-200">
            <p>{state.message}</p>
          </div>
        )}
      </AnimatedList>
    </section>
  );
}
