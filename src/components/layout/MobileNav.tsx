"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, MessageCircle, Phone, Info } from "lucide-react";

export function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "About", href: "/about", icon: Info },
        { name: "Products", href: "/products", icon: Package },
        { name: "Chat", href: "/chat", icon: MessageCircle },
        { name: "Contact", href: "/contact", icon: Phone },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50 flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
                            }`}
                    >
                        <Icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
                        <span className="text-[10px] font-medium">{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}
