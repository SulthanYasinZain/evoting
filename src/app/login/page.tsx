import Image from "next/image";
import Logo from "@/assets/images/Logo-upnvj.png";

export default function Login() {
  return (
    <section className="mx-4 flex h-[85svh] items-center justify-center">
      <form className=" bg-background  flex flex-col justify-between w-[350px] h-[400px] p-4 gap-4 rounded-lg shadow-md">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src={Logo} alt="Logo UPNVJ" width={50} height={50} />
          <h1 className="text-2xl font-semibold text-center">
            Website Pemilu Fakultas Hukum UPNVJ
          </h1>
          <p className="text-[#666666]">Login Untuk Melanjutkan</p>
        </div>
        <div className="flex flex-col">
          <label>NIM</label>
          <input
            type="text"
            placeholder="NIM"
            className="border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border-2 focus:border-foreground"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            placeholder="Masukan Password"
            className="border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border-2 focus:border-foreground"
          />
        </div>
        <button className="bg-primary hover:bg-[#b21717] active:bg-[#9e1515] text-background p-2 rounded-lg hover:cursor-pointer">
          Login
        </button>
      </form>
    </section>
  );
}
