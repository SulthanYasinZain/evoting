import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <>
      <p>loading</p>
      <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
    </>
  );
}
