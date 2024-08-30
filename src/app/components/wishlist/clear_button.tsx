import { useRef } from "react";
import { toast } from "sonner";
import { Info, Trash2 } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/app/(public)/products/_store/wishlist";
import { useOnClickOutside } from "../hooks/use_onClick_outside";

export function ClearWishlistButton() {
  const { clearList } = useWishlistStore();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    if (ref.current) {
      const trigger = ref.current.querySelector('[aria-expanded="true"]');
      if (trigger) (trigger as HTMLButtonElement).click();
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <Accordion
      type="single"
      collapsible
      className="overflow-hidden rounded bg-muted"
    >
      <AccordionItem ref={ref} value="delete-wish" className="border-b-0">
        <AccordionTrigger className="py-0 hover:no-underline [&>svg]:hidden">
          <Button
            asChild
            variant={"destructive"}
            className="w-full rounded-b-none border-0 px-3 py-2"
          >
            <span>Clear Wishlist</span>
          </Button>
        </AccordionTrigger>

        <AccordionContent>
          <p className="py-4 text-center font-medium text-muted-foreground">
            Are you sure you want to clear your wishlist?
          </p>
          <div className="flex items-center justify-center">
            <Button
              size={"sm"}
              variant={"destructive"}
              className="gap-1 bg-transparent p-0 px-4 text-xs text-destructive hover:bg-destructive/20"
              onClick={() => {
                clearList();
                toast.custom(() => {
                  return (
                    <div className="flex items-center gap-4">
                      <Info className="text-blue-500" />
                      <p className="text-sm">Your wishlist is now empty.</p>
                    </div>
                  );
                });
              }}
            >
              <span>Procced</span>
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
