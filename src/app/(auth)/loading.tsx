import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-view mx-auto flex min-h-svh items-center justify-center bg-background">
      <div className="flex animate-pulse flex-col items-center overflow-hidden">
        <Loader className="size-20 animate-[spin_2s_linear_infinite] md:size-28"></Loader>
      </div>
    </div>
  );
}
