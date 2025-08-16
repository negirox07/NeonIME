'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Wand2 } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "./nav";

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-4 py-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                                'flex items-center gap-2 p-2 rounded-md text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
                                    ? 'bg-accent text-accent-foreground'
                                    : 'text-muted-foreground'
                            )}
                        >
                          {item.label === 'AI Recs' && <Wand2 className="w-5 h-5"/>}
                          {item.label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
