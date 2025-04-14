import Image from "next/image";
import { HelpCircle, LogOut } from "lucide-react";
import Logo from "@/app/assets/images/logo_upn.png";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <header className="w-full border-b  bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="UPNVJ Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-lg font-medium">Fakultas Hukum UPNVJ</span>
        </div>
        <div className="flex items-center gap-4">
          {token && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
