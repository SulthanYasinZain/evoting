export default function Login() {
  return (
    <section className="flex h-[90vh] items-center justify-center">
      <form className=" flex flex-col justify-between w-fit h-[400px] p-4 drop-shadow-sm rounded-lg bg-background">
        <h1>Website Pemilu Fakultas Hukum UPNVJ</h1>
        <p>Login Untuk Melanjutkan</p>
        <input
          type="text"
          placeholder="NIM"
          className="border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border-2 focus:border-foreground"
        />
        <input
          type="passsword"
          placeholder="Masukan Password"
          className="border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border-2 focus:border-foreground"
        />
        <button className="bg-primary hover:bg-[#b21717] active:bg-[#9e1515] text-background p-2 rounded-lg hover:cursor-pointer">
          Login
        </button>
      </form>
    </section>
  );
}
