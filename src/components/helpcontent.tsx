import Image from "next/image";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LazyVideo from "./Lazyvideo";
function HelpContent({
  title,
  video,
  description,
  alert,
}: {
  title: string;
  video?: string;
  description: string;
  alert?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full sm:w-1/2 aspect-[16/9]">
        <p className="hidden">{video}</p>
        <LazyVideo src={video} />
      </div>
      <div className="sm:w-1/2 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <p className="text-base text-gray-600">{description}</p>
        </div>
        {alert && alert.length > 0 && (
          <div className="mt-4 border rounded-md p-4 border-amber-300 bg-amber-50 text-amber-700">
            {alert}
          </div>
        )}
      </div>
    </div>
  );
}

function HelpAccordion({
  item,
  question,
  answer,
}: {
  item: string;
  question: string;
  answer: string;
}) {
  return (
    <>
      <AccordionItem value={item}>
        <AccordionTrigger className="text-gray-800">
          {question}
        </AccordionTrigger>
        <AccordionContent>{answer}</AccordionContent>
      </AccordionItem>{" "}
    </>
  );
}

export { HelpAccordion, HelpContent };
