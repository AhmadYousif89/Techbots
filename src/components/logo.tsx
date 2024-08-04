import Link from "next/link";
import { Computer } from "lucide-react";
import { cn } from "@/app/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={"/"}
      className={cn([
        "flex items-center gap-2 text-lg font-bold text-secondary",
        className,
      ])}
    >
      <Computer size={20} /> TechBots
    </Link>
  );
}
