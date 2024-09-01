import { PackageSearchIcon } from "lucide-react";

export default function LoadingProduct() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-primary/90 backdrop-blur-[2px]">
      <div className="flex items-center gap-4 text-muted">
        <PackageSearchIcon className="size-10 animate-pulse" />
        <p className="text-lg font-semibold">Loading Product . . .</p>
      </div>
    </div>
  );
}
