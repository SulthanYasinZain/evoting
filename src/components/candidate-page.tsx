import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default async function CandidateDetailsPage({
  Data: candidate,
}: {
  Data: any;
}) {
  console.log(candidate);
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/home">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>

        <Button className="flex items-center gap-2">
          <Check size={16} />I Already Read
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full h-[300px]">
            <Image
              src={
                candidate.image_url || "/placeholder.svg?height=300&width=800"
              }
              alt={candidate.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
              {candidate.number}
            </div>
            <h1 className="text-3xl font-bold capitalize">{candidate.name}</h1>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Vision</h2>
              <p className="text-muted-foreground">{candidate.vision}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Mission</h2>
              <p className="text-muted-foreground">{candidate.mission}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
