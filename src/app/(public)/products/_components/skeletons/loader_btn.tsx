import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function LoaderButton() {
  return (
    <Skeleton className="flex h-10 w-28 justify-center rounded-lg bg-muted p-2">
      <Loader2 className="animate-spin text-muted-foreground" />
    </Skeleton>
  );
}
