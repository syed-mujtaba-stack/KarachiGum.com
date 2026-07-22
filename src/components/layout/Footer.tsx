"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

import { useState, useRef } from "react";

export function Footer() {
    const pathname = usePathname();
    const tapCountRef = useRef<number>(0);
    const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

    if (pathname === "/chat") return null;

    // Mobile Secret Trigger: Tap 3 times on copyright text to open Admin Login Modal
    const handleFooterTap = () => {
        tapCountRef.current += 1;
        if (tapTimerRef.current) clearTimeout(tapTimerRef.current);

        if (tapCountRef.current >= 3) {
            tapCountRef.current = 0;
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("open-admin-secret"));
            }
        } else {
            tapTimerRef.current = setTimeout(() => {
                tapCountRef.current = 0;
            }, 1500);
        }
    };

    return (
        <footer className="w-full border-t bg-muted/40">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-16">

                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/Logo.png" alt="Karachi Gum Logo" width={150} height={50} className="w-36 h-auto object-contain" />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Global leaders in industrial chemical supply. Providing premium quality Guar Gum and industrial solutions worldwide.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-semibold">Quick Links</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/industries" className="hover:text-primary transition-colors">Industries</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-semibold">Our Products</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li><Link href="/products/guar-gum" className="hover:text-primary transition-colors">Guar Gum Powder</Link></li>
                            <li><Link href="/products/industrial" className="hover:text-primary transition-colors">Industrial Grade</Link></li>
                            <li><Link href="/products/food" className="hover:text-primary transition-colors">Food Grade</Link></li>
                            <li><Link href="/products/fast-hydration" className="hover:text-primary transition-colors">Fast Hydration</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-semibold">Contact Us</h3>
                        <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                                <span>Plot No. S/9, Shed No.3, Gulbai, SITE, Karachi-75730</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 shrink-0 text-primary" />
                                <span>+92-21-32582771</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 shrink-0 text-primary" />
                                <span>info@karachigum.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
                    <p 
                        onClick={handleFooterTap} 
                        className="cursor-pointer select-none" 
                        title="Karachi Gum Industry"
                    >
                        © {new Date().getFullYear()} Karachi Gum. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
