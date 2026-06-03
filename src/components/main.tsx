import * as React from "react";

import { cn } from "@/lib/utils";

export const Main = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"main">) => {
  return (
    <main
      ref={ref}
      className={cn("max-view mx-auto w-full grow bg-background", className)}
      {...props}
    />
  );
};
