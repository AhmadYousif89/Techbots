import { toast } from "sonner";
import { Info, Trash2 } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { useLocalStorage } from "../hooks/use_local_storage";
import { useWishlistStore } from "@/app/products/_store/wishlist";

export function ClearWishlistButton() {
  // const [, , clearWishlist] = useLocalStorage('wishlist', []);
  const { clearList } = useWishlistStore();

  return (
    <Accordion
      type="single"
      collapsible
      className="overflow-hidden rounded bg-muted"
    >
      <AccordionItem value="delete-wish" className="border-b-0">
        <AccordionTrigger className="py-0 hover:no-underline [&>svg]:hidden">
          <Button
            asChild
            className="w-full rounded-none border-0 px-3 py-2 hover:bg-primary hover:text-destructive"
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
