import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Quality Control", href: "/quality-control" },
        // Products is handled separately now
        { name: "Contact Us", href: "/contact" },
    ];

    const productLinks = [
        { name: "Guar Seeds", href: "/products/guar-seeds" },
        { name: "Guar Splits", href: "/products/guar-splits" },
        { name: "Guar Meal Churi", href: "/products/guar-meal-churi" },
        { name: "Guar Meal Korma", href: "/products/guar-meal-korma" },
        { name: "Guar Gum Powder", href: "/products/guar-gum-powder" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/Logo.png" alt="Karachi Gum Logo" width={180} height={60} className="w-44 h-auto object-contain" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">Home</Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">About Us</Link>
                    <Link href="/quality-control" className="text-sm font-medium transition-colors hover:text-primary">Quality Control</Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none group">
                            Products <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-48">
                            <DropdownMenuLabel className="text-primary">Guar</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {productLinks.map((product) => (
                                <DropdownMenuItem key={product.href} asChild>
                                    <Link href={product.href} className="cursor-pointer font-normal">{product.name}</Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/products" className="cursor-pointer font-bold">All Products</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">Contact Us</Link>
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        <Link href="/contact">Get a Quote</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
