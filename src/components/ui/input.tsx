export default function Input({
  type,
  placeholder,
  label,
  name,
}: {
  type: string;
  placeholder?: string;
  label: string;
  name: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-lg">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-[#A0A0A0] py-2 px-4 rounded-lg focus:outline-none focus:border focus:border-foreground"
        autoComplete="off"
        name={name}
      />
    </div>
  );
}
