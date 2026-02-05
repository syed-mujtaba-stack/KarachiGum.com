"use client";

import Link from "next/link";
import { MoveLeft, Home, Package, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* 1. Technical Grid Layer - Softened for Light Mode */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px'
                }}
            />
            {/* 2. Driftng Industrial Orbs (Light Aura) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-emerald-500/[0.08] blur-[130px] rounded-full animate-pulse duration-[8s]" />
                <div className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-slate-500/[0.05] blur-[150px] rounded-full animate-pulse duration-[12s]" />
                <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-400/[0.05] blur-[100px] rounded-full animate-pulse duration-[6s]" />
            </div>

            {/* 3. High-End Noise/Grain Texture - Subtle on White */}
            <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.05] mix-blend-multiply"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            <div className="relative z-10 w-full max-w-2xl text-center">
                {/* 4. Glass-Text Hero 404 - Light Mode Refinement */}
                <div className="mb-2 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-[14rem] md:text-[20rem] font-black leading-none tracking-tighter text-slate-50 select-none drop-shadow-sm">
                        404
                    </h1>
                </div>

                {/* 5. Immersive Industrial Card 2.0 - Light Mode Glassmorphism */}
                <div className="relative group animate-in fade-in zoom-in-95 duration-1000 delay-300">
                    {/* Shadow/Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-slate-200/50 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />

                    <div className="relative bg-white/40 backdrop-blur-3xl border border-slate-200/50 rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-slate-200/40 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Technical Deviation
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-5">
                            Resource Unavailable
                        </h2>

                        <p className="text-slate-500 text-lg font-light mb-12 max-w-md mx-auto leading-relaxed">
                            The requested resource is currently offline or has been re-indexed. Our automated systems are standing by to guide you back.
                        </p>

                        {/* Navigation Shortcuts - Light Mode Polish */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                            {[
                                { label: "Laboratory", icon: Home, href: "/" },
                                { label: "Catalog", icon: Package, href: "/products" },
                                { label: "Contact", icon: MessageSquare, href: "/contact" }
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full h-16 rounded-2xl bg-white/50 border border-slate-200 hover:bg-slate-50 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-500 group flex flex-col items-center justify-center p-0 shadow-sm"
                                    >
                                        <item.icon className="h-5 w-5 mb-1 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Link */}
                <div className="mt-16 animate-in fade-in duration-1000 delay-700">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 text-slate-400 hover:text-emerald-600 transition-all duration-500 text-sm font-semibold tracking-wide uppercase group"
                    >
                        <MoveLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Main System Dashboard
                    </Link>
                </div>
            </div>

            {/* Logo Watermark / UI Accents */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-slate-200" />
                <div className="text-slate-300 font-bold tracking-[0.4em] uppercase text-[10px] whitespace-nowrap">
                    KGI • Technical Services Division
                </div>
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-slate-200" />
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-10 left-10 p-4 border-l border-t border-slate-100 rounded-tl-3xl opacity-50" />
            <div className="absolute bottom-10 right-10 p-4 border-r border-b border-slate-100 rounded-br-3xl opacity-50" />
        </div>
    );
}
