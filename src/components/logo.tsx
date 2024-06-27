import Link from 'next/link';
import { Computer } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={'/'}
      className={cn([
        'flex items-center gap-2 text-secondary text-xl font-bold',
        className
      ])}>
      <Computer /> TechBots
    </Link>
  );
}
