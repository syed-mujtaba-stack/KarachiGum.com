"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LETTERS = "KARACHIGUM".split("");

// Random directions and delays for a "flying in" effect
const LETTER_CONFIG = [
    { dir: "-translate-x-[200%] -translate-y-[200%]", delay: "delay-[100ms]" },
    { dir: "translate-x-[200%] -translate-y-[150%]", delay: "delay-[300ms]" },
    { dir: "-translate-x-[150%] translate-y-[200%]", delay: "delay-[200ms]" },
    { dir: "translate-x-[300%] translate-y-[100%]", delay: "delay-[500ms]" },
    { dir: "-translate-x-[300%] -translate-y-[50%]", delay: "delay-[150ms]" },
    { dir: "translate-x-[100%] translate-y-[300%]", delay: "delay-[400ms]" },
    { dir: "translate-y-[250%] translate-x-[50%]", delay: "delay-[250ms]" },
    { dir: "-translate-y-[300%] -translate-x-[100%]", delay: "delay-[600ms]" },
    { dir: "translate-x-[250%] -translate-y-[300%]", delay: "delay-[100ms]" },
    { dir: "-translate-x-[150%] translate-y-[150%]", delay: "delay-[350ms]" },
];

export function LaboratoryLoading() {
    const [isAssembled, setIsAssembled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Trigger assembly shortly after mount
        const assemblyTimer = setTimeout(() => setIsAssembled(true), 100);

        // Visibility logic - 4 seconds total experience
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => setIsVisible(false), 1000);
        }, 3500);

        return () => {
            clearTimeout(assemblyTimer);
            clearTimeout(fadeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-1000 ease-in-out",
            isFading ? "opacity-0 pointer-events-none scale-110" : "opacity-100"
        )}>
            {/* 1. Technical Grid Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* 2. Central Glow */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
                <div className={cn(
                    "w-[400px] h-[400px] bg-emerald-500/[0.05] blur-[120px] rounded-full transition-all duration-[2000ms] ease-out",
                    isAssembled ? "scale-150 opacity-100" : "scale-50 opacity-0"
                )} />
            </div>

            {/* 3. Noise Texture */}
            <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] mix-blend-multiply"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            <div className="relative z-10 flex flex-col items-center">
                {/* 4. Animated Letters */}
                <div className="flex items-center gap-1 md:gap-3 mb-4">
                    {LETTERS.map((char, i) => (
                        <span
                            key={i}
                            className={cn(
                                "text-5xl md:text-8xl font-black text-slate-900 tracking-tighter transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1)",
                                i === 6 ? "mr-4 md:mr-8" : "", // Space between KARACHI and GUM
                                !isAssembled
                                    ? cn("opacity-0 scale-50 blur-xl", LETTER_CONFIG[i].dir)
                                    : "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0",
                                LETTER_CONFIG[i].delay
                            )}
                        >
                            {char}
                        </span>
                    ))}
                </div>

                {/* 5. Subtitle */}
                <div className={cn(
                    "transition-all duration-1000 delay-[1000ms] ease-out",
                    isAssembled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <div className="text-[10px] md:text-xs font-bold text-emerald-600 uppercase tracking-[0.5em] flex items-center gap-3">
                        <div className="h-[1px] w-6 md:w-12 bg-emerald-200" />
                        Industrial Chemical Excellence
                        <div className="h-[1px] w-6 md:w-12 bg-emerald-200" />
                    </div>
                </div>
            </div>

            {/* 6. Static Branding Decor */}
            <div className="absolute bottom-12 left-12 opacity-30 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">
                    Established 1995 | Karachi, Pakistan
                </div>
            </div>
        </div>
    );
}
