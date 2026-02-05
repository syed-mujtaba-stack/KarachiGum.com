"use client";

import { useEffect, useState } from "react";
import { Loader2, Box, Cpu, Database, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_LOGS = [
    { text: "INITIALIZING RHEOLOGY_ENGINE_V4", icon: <Cpu className="h-4 w-4" /> },
    { text: "CALIBRATING VOLUMETRIC_FLUX", icon: <Database className="h-4 w-4" /> },
    { text: "SYNCING PORT_LOGISTICS_KARACHI", icon: <Globe className="h-4 w-4" /> },
    { text: "OPTIMIZING VISCOSITY_METRICS", icon: <Box className="h-4 w-4" /> },
    { text: "SYSTEM STABILIZED. READY.", icon: <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" /> }
];

export function LaboratoryLoading() {
    const [logIndex, setLogIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Log rotation logic
        const logDuration = 4000; // Duration for all logs
        const intervalTime = logDuration / STATUS_LOGS.length;

        const logInterval = setInterval(() => {
            setLogIndex((prev) => (prev < STATUS_LOGS.length - 1 ? prev + 1 : prev));
        }, intervalTime);

        // Visibility logic - 5 seconds total
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => setIsVisible(false), 1000); // Allow time for fade animation
        }, 5000);

        return () => {
            clearInterval(logInterval);
            clearTimeout(timer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-1000 ease-in-out",
            isFading ? "opacity-0 pointer-events-none scale-110" : "opacity-100"
        )}>
            {/* 1. Technical Grid Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px'
                }}
            />

            {/* 2. Drifting Industrial Orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.08] blur-[130px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-slate-500/[0.05] blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* 3. Noise Texture */}
            <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.05] mix-blend-multiply"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
                {/* 4. Technical Header */}
                <div className="flex items-center gap-3 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em]">System Boot</div>
                        <div className="text-lg font-bold text-slate-800 tracking-tight">Technical Services</div>
                    </div>
                </div>

                {/* 5. Progress System */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-8 shadow-inner">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                        style={{ width: `${((logIndex + 1) / STATUS_LOGS.length) * 100}%` }}
                    />
                </div>

                {/* 6. Status Logs */}
                <div className="w-full space-y-3 font-mono">
                    <div
                        key={logIndex}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                        <div className="text-emerald-500">
                            {STATUS_LOGS[logIndex].icon}
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 tracking-wider uppercase">
                            {STATUS_LOGS[logIndex].text}
                        </span>
                    </div>

                    {/* Previous/Ghost Logs */}
                    {logIndex > 0 && (
                        <div className="flex items-center gap-3 px-4 py-2 opacity-20 blur-[0.5px]">
                            <div className="text-slate-400">
                                {STATUS_LOGS[logIndex - 1].icon}
                            </div>
                            <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
                                {STATUS_LOGS[logIndex - 1].text}
                            </span>
                        </div>
                    )}
                </div>

                {/* 7. Branding */}
                <div className="mt-16 text-center">
                    <div className="text-slate-300 font-bold tracking-[0.4em] uppercase text-[9px] mb-2 leading-none">
                        Karachi Gum Industry
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-slate-100" />
                        <div className="h-1 w-1 rounded-full bg-emerald-400" />
                        <div className="h-[1px] w-8 bg-slate-100" />
                    </div>
                </div>
            </div>

            {/* Static UI Decor */}
            <div className="absolute top-10 right-10 flex flex-col items-end gap-1 opacity-20">
                <div className="text-[10px] font-mono text-slate-400 tracking-tighter">LAT: 24.8607° N</div>
                <div className="text-[10px] font-mono text-slate-400 tracking-tighter">LON: 67.0011° E</div>
            </div>
            <div className="absolute bottom-10 left-10 opacity-20">
                <div className="text-[10px] font-mono text-slate-400 tracking-widest">ENCRYPTION: AES-256-GCM</div>
            </div>
        </div>
    );
}
