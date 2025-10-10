import Link from 'next/link';
import { LogoIcon } from '@/components/icons/logo';
import { Nav } from '@/components/layout/nav';
import { SearchInput } from '@/components/layout/search-input';
import { Suspense } from 'react';
import { MobileNav } from './mobile-nav';
import AdSenseUnit from '../AdSenseUnit';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <LogoIcon className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">NeonIME</span>
        </Link>
        <div className="hidden md:block">
            <Suspense fallback={<div />}>
                <Nav />
            </Suspense>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
        <AdSenseUnit adSlot="5342210952" autoMode='auto' />
          <Suspense fallback={<div />}>
            <SearchInput />
          </Suspense>
           <div className="md:hidden">
             <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
