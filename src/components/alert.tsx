export default function Alert({
  variant,
}: {
  variant?: "avaiable" | "success";
}) {
  return (
    <span
      className={`w-full rounded-md mt-4 p-4 ${
        variant === "avaiable"
          ? "bg-[#EFF6FF] border-2 border-[#DBEAFE]"
          : "bg-[#DDFFD4] border-2 border-[#B8FFB4]"
      }`}
    >
      <p className="font-semibold">
        {variant === "success"
          ? "Terima Kasih atas Partisipasi Anda dalam Pemilihan."
          : "Nama Event"}
      </p>
    </span>
  );
}
