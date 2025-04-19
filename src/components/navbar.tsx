import Image from "next/image";
import { HelpCircle, LogOut } from "lucide-react";
import LogoutButton from "./logoutButton";
import Logo from "@/assets/images/logo_upn.png";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <header className="w-full border-b border-neutral-400 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href={"/home"} className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="UPNVJ Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />

          <span className="text-sm sm:text-xl font-medium">
            Fakultas Hukum UPNVJ
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {token && <LogoutButton />}
          <Link
            href={"/help"}
            className="flex gap-2 p-2 rounded text-sm font-medium text-gray-700 hover:bg-neutral-200"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Bantuan</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
