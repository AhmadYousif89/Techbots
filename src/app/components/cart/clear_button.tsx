import { useRef, useTransition } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { Info, Trash2 } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/app/(protected)/cart/_store/cart";
import { clearServerCart } from "@/app/(protected)/cart/_actions/actions";
import { useOnClickOutside } from "../hooks/use_onClick_outside";
import { LoadingSkeleton } from "@/app/(public)/products/_components/skeletons/loading_btn";

export function ClearCartButton() {
  const { userId } = useAuth();
  const clearCart = useCartStore((s) => s.clearCart);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    if (ref.current) {
      const trigger = ref.current.querySelector('[aria-expanded="true"]');
      if (trigger) (trigger as HTMLButtonElement).click();
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleDelete = () => {
    startTransition(async () => {
      if (userId) await clearServerCart(userId);
      clearCart(); // Clear local cart
      toast.custom(() => {
        return (
          <div className="flex items-center gap-4">
            <Info className="text-blue-500" />
            <p className="text-sm">Your cart is now empty.</p>
          </div>
        );
      });
    });
  };

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
            <span>Clear Cart</span>
          </Button>
        </AccordionTrigger>

        <AccordionContent>
          <p className="py-4 text-center font-medium text-muted-foreground">
            Are you sure you want to clear your cart?
          </p>
          <div className="flex items-center justify-center">
            {isPending ? (
              <LoadingSkeleton className="h-9 w-28 bg-input px-4" />
            ) : (
              <Button
                size={"sm"}
                disabled={isPending}
                variant={"destructive"}
                className="gap-1 bg-transparent p-0 px-4 text-xs text-destructive hover:bg-destructive/20"
                onClick={handleDelete}
              >
                <span>Procced</span>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
