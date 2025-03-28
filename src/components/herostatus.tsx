export default function HeroStatus({ title }: { title: string }) {
  return (
    <span className="flex gap-2 bg-primary rounded-full p-3">
      <p className="text-background font-semibold">{title}</p>
      <p className="bg-secondary text-primary rounded-2xl px-4 ">Aktif</p>
    </span>
  );
}
