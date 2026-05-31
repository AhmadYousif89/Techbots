import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slash, ShoppingCart } from "lucide-react";

export const CartEmpty = () => {
  return (
    <CardContent className="flex flex-col pt-6">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Cart Details</CardTitle>
        <CardDescription className="text-xs lg:text-sm">
          Your cart is empty. Start adding some items to continue.
        </CardDescription>
      </CardHeader>
      <div className="my-10">
        <Slash
          strokeWidth={1}
          className="m-auto size-44 text-muted-foreground lg:size-56"
        >
          <ShoppingCart strokeWidth={1} className="text-muted-foreground/75" />
        </Slash>
      </div>
    </CardContent>
  );
};
