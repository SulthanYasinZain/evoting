"use client";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import login from "@/app/action/login";
import { Loader2 } from "lucide-react";
import Logo from "@/assets/images/logo_upn.png";
import { toast } from "sonner";

export default function LoginForm() {
  const [state, loginAction, isLoading] = useActionState(login, null);

  useEffect(() => {
    if (state?.success === false) {
      toast.error(state?.error || "Login failed");
    }
  }, [state]);
  return (
    <form
      action={loginAction}
      className="w-[350px] sm:w-[400px] p-4 border border-neutral-200 rounded-xl"
    >
      <div className="flex flex-col justify-center items-center gap-2 text-center ">
        <Image src={Logo} alt="Logo UPN" width={50} height={50} className="" />
        <h1 className="text-xl font-bold">
          Website Pemilu Fakultas Hukum UPNVJ
        </h1>
        <p className="text-sm text-gray-500">Login Untuk Melanjutkan</p>
      </div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        disabled={isLoading}
        className="border border-gray-300 rounded-md p-2 w-full mt-1 mb-4"
        placeholder="Email@example.com"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        disabled={isLoading}
        placeholder="********"
        name="password"
        id="password"
        className="border border-gray-300 rounded-md p-2 w-full mt-1 mb-4"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="cursor-pointer w-full hover:bg-red-600 disabled:bg-red-400  bg-red-500 text-white rounded-md p-2 mt-4 h-10"
      >
        {isLoading ? (
          <div className="flex justify-center items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
