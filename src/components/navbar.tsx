import Image from "next/image";
import Link from "next/link";
import { CircleHelp } from "lucide-react";
import Logo from "@/assets/images/Logo-upnvj.png";

export default function Navbar() {
  return (
    <nav className="p-2 border-b border-b-[#BFBFBF]">
      <div className="flex justify-between items-center ">
        <Link href={"/"} className="flex items-center gap-4">
          <Image src={Logo} alt="logo" width={50} height={50} />
          <p className="text-sm sm:text-xl font-semibold">
            Fakultas Hukum UPNVJ
          </p>
        </Link>
        <Link
          href={"/help"}
          className="flex items-center gap-2 border rounded p-2 w-fit"
        >
          <CircleHelp />
          <p>Help</p>
        </Link>
      </div>
    </nav>
  );
}
