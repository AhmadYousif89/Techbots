import { PropsWithChildren } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

type LoadingButtonProps = PropsWithChildren<{
  className?: string;
}>;

export function LoadingSkeleton({ className, children }: LoadingButtonProps) {
  return (
    <Skeleton
      className={cn(
        "flex h-10 items-center justify-center rounded-md bg-muted",
        className,
      )}
    >
      {children ? (
        children
      ) : (
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      )}
    </Skeleton>
  );
}
