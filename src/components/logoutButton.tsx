"use client";
import { LogOut } from "lucide-react";

import Logout from "@/app/action/logout";
export default function LogoutButton() {
  return (
    <form action={Logout}>
      <button className="cursor-pointer flex gap-2 p-2 rounded text-sm font-medium text-gray-700 hover:bg-neutral-200">
        <LogOut className="h-5 w-5" color={"black"} />
        <p className="hidden sm:block">Keluar</p>
      </button>
    </form>
  );
}
