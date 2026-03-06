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

        // Visibility logic - 4.5 seconds total cinematic experience
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => setIsVisible(false), 1000);
        }, 4000);

        return () => {
            clearTimeout(assemblyTimer);
            clearTimeout(fadeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-1000 ease-in-out font-outfit",
            isFading ? "opacity-0 pointer-events-none scale-105 blur-sm" : "opacity-100"
        )}>
            {/* 1. Cinematic Background Layer */}
            <div className="absolute inset-0 z-0 bg-slate-50/50" />

            {/* 2. Technical Grid - Reduced opacity for elegance */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #94a3b8 1px, transparent 1px),
                        linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
                    `,
                    backgroundSize: '120px 120px'
                }}
            />

            {/* 3. Dynamic Cinematic Beams */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className={cn(
                    "absolute -top-[20%] -left-[10%] w-[120%] h-[140%] bg-[radial-gradient(circle_at_center,transparent_20%,#10b98105_50%,transparent_80%)] transition-transform duration-[6000ms] ease-in-out",
                    isAssembled ? "rotate-12 scale-110" : "rotate-0 scale-100"
                )} />
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.03] blur-[150px] rounded-full transition-all duration-[3000ms] ease-out",
                    isAssembled ? "scale-150 opacity-100" : "scale-50 opacity-0"
                )} />
            </div>

            {/* 4. Scanning Micro-animation */}
            <div className="absolute inset-0 z-1 pointer-events-none">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent absolute top-0 animate-[scan_4s_ease-in-out_infinite]" />
            </div>

            {/* 5. Noise Texture */}
            <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.02] mix-blend-multiply"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            <div className="relative z-10 flex flex-col items-center w-full max-w-[100vw] overflow-hidden">
                {/* 6. Animated Letters with Shimmer */}
                <div className="flex flex-nowrap items-center justify-center gap-0.5 sm:gap-2 md:gap-4 mb-10 whitespace-nowrap">
                    {LETTERS.map((char, i) => (
                        <div key={i} className="relative group flex shrink-0">
                            <span
                                className={cn(
                                    "text-[8vw] sm:text-6xl md:text-9xl font-black transition-all duration-[1500ms] cubic-bezier(0.22, 1, 0.36, 1) cursor-default select-none",
                                    i === 6 ? "ml-2 sm:ml-4 md:ml-12" : "",
                                    !isAssembled
                                        ? cn("opacity-0 scale-50 blur-2xl", LETTER_CONFIG[i].dir)
                                        : "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0",
                                    LETTER_CONFIG[i].delay,
                                    "text-slate-900 drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)]"
                                )}
                            >
                                {char}
                                {/* Subtle Shimmer Overlay */}
                                {isAssembled && (
                                    <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent bg-[length:200%_200%] animate-[shimmer_3s_infinite_linear] pointer-events-none mix-blend-soft-light" />
                                )}
                            </span>
                        </div>
                    ))}
                </div>

                {/* 7. Subtitle with Progressive reveal */}
                <div className={cn(
                    "transition-all duration-1000 delay-[1200ms] ease-out w-full",
                    isAssembled ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                )}>
                    <div className="flex flex-col items-center text-center">
                        <div className="text-[8px] sm:text-[10px] md:text-xs font-bold text-emerald-600 uppercase tracking-[0.4em] sm:tracking-[0.8em] flex items-center gap-2 sm:gap-4 mb-2">
                            Industrial Chemical Excellence
                        </div>
                        <div className="h-[1px] w-24 sm:w-32 bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
                    </div>
                </div>
            </div>

            {/* 8. Cinematic Footer Decor */}
            <div className={cn(
                "absolute bottom-8 sm:bottom-16 w-full px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 sm:gap-0 transition-all duration-1000 delay-[1500ms]",
                isAssembled ? "opacity-40 translate-y-0" : "opacity-0 translate-y-4"
            )}>
                <div className="flex flex-col items-center sm:items-start gap-1">
                    <div className="text-[7px] sm:text-[8px] font-mono text-slate-400 tracking-widest uppercase text-center sm:text-left">Precision Standards</div>
                    <div className="flex gap-1 justify-center sm:justify-start">
                        {[1, 2, 3].map(j => (
                            <div key={j} className="h-1 w-3 sm:w-4 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400 animate-[loading_2s_infinite_ease-in-out]" style={{ animationDelay: `${j * 0.2}s` }} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-[7px] sm:text-[8px] font-mono text-slate-400 tracking-tighter text-center sm:text-right">
                    EST. 1995 • PIONEERING RHEOLOGY
                </div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    0% { background-position: -200% -200%; }
                    100% { background-position: 200% 200%; }
                }
                @keyframes scan {
                    0% { top: -10%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 110%; opacity: 0; }
                }
                @keyframes loading {
                    0%, 100% { width: 0%; transform: translateX(0); }
                    50% { width: 100%; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
