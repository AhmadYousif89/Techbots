import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-primary/70">
      <div className="flex items-center gap-4 text-muted">
        <LoaderIcon className="size-20 animate-[spin_2s_linear_infinite]" />
      </div>
    </div>
  );
}
