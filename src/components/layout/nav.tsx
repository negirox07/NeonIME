'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/seasons', label: 'Seasons' },
  { href: '/manga', label: 'Manga' },
  { href: '/characters', label: 'Characters' },
  { href: '/people', label: 'People' },
  { href: '/genres', label: 'Genres' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-sm">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) 
              ? 'text-foreground font-semibold' 
              : 'text-foreground/60'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
