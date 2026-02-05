"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function ChatTrigger() {
    const pathname = usePathname();

    // Don't show the floating button if we are already on the chat page
    if (pathname === "/chat") return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 hidden md:block">
            <Button
                asChild
                size="lg"
                className="rounded-full h-14 w-14 shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105"
            >
                <Link href="/chat">
                    <MessageCircle className="h-7 w-7" />
                    <span className="sr-only">Chat with AI</span>
                </Link>
            </Button>
        </div>
    );
}
