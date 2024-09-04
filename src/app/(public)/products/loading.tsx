import { BlocksIcon } from "lucide-react";

export default function LoadingProducts() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-primary/90 backdrop-blur-[2px]">
      <div className="flex items-center gap-4 text-muted">
        <BlocksIcon className="size-10 animate-bounce" />
        <p className="text-lg font-semibold">Loading Products . . .</p>
      </div>
    </div>
  );
}
