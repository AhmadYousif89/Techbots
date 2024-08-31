import React, { ComponentProps } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingButtonProps = {
  isLoading?: boolean;
} & ComponentProps<"div">;

export function LoadingButton({
  className,
  children,
  isLoading,
  ...props
}: LoadingButtonProps) {
  return (
    <div className={cn("relative rounded-md bg-muted", className)} {...props}>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </span>
      )}

      <div className={isLoading ? "pointer-events-none invisible" : ""}>
        {children}
      </div>
    </div>
  );
}
