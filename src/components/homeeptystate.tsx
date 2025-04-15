import Image from "next/image";
import { Button } from "@/components/ui/button";
import image from "@/app/assets/images/emptyelection.png";

export default function HomeEptystate() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <Image src={image} alt="Voting Image" width={300} height={300} />
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No Active Elections
        </h3>
        <p className="text-gray-500 text-center max-w-md mb-4">
          There are currently no active elections. Please check back later or
          contact the administrator for more information.
        </p>
        <Button variant="outline" className="mt-2">
          Refresh
        </Button>
      </div>
    </div>
  );
}
