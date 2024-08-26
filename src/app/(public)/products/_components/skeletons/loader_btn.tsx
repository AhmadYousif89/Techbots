import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function LoaderButton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn(
        "flex h-10 w-28 justify-center rounded-lg bg-muted p-2",
        className,
      )}
    >
      <Loader2 className="animate-spin text-muted-foreground" />
    </Skeleton>
  );
}
