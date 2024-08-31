import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProductDetailsTableProps = {
  data: Record<string, string>;
  type: "specs" | "feats";
};

export const ProductDetailsTable = ({
  data,
  type,
}: ProductDetailsTableProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="details"
        className={cn(type == "specs" ? "border-b-0" : "")}
      >
        <AccordionTrigger
          className={cn(
            `text-xs uppercase text-muted-foreground hover:text-foreground/50`,
            type == "feats" && "sm:pt-0",
          )}
        >
          {type === "specs" ? "Specifications" : "Features"}
        </AccordionTrigger>
        <AccordionContent>
          <table className="bg-secondary text-xs">
            <thead className="bg-primary text-secondary">
              <tr>
                <th className="w-1/4 p-2">Attribute</th>
                <th className="w-3/4 p-2">Value</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
