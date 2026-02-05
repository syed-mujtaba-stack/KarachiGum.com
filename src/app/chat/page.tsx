"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2, Plus, Mic, AudioLines, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const SUGGESTED_PROMPTS = [
    { title: "Viscosity Specs", icon: <Zap className="h-4 w-4" />, prompt: "What are the viscosity specifications for your 200 Mesh Guar Gum?" },
    { title: "Export Logistics", icon: <Zap className="h-4 w-4" />, prompt: "Which ports do you export to from Karachi, and what is the lead time?" },
    { title: "Food Grade Info", icon: <Zap className="h-4 w-4" />, prompt: "Tell me about your Food Grade Guar Gum certifications (ISO/Halal)." },
    { title: "Technical Data", icon: <Zap className="h-4 w-4" />, prompt: "Can you provide a COA/Technical Data Sheet for Industrial grade gum?" }
];


type Message = {
    role: "user" | "assistant" | "system";
    content: string;
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial greeting handling
    const hasStarted = messages.length > 0;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSuggestedPrompt = (prompt: string) => {
        setInput(prompt);
    };

    const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
        if (e) e.preventDefault();
        const finalInput = overrideInput || input;
        if (!finalInput.trim() || isLoading) return;


        const userMessage: Message = { role: "user", content: finalInput };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })) }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            if (!response.body) return;

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = { role: "assistant", content: "" } as Message;
            let buffer = ""; // Buffer for partial chunks

            setMessages((prev) => [...prev, assistantMessage]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");

                // Keep the last partial line in the buffer
                buffer = lines.pop() || "";

                for (const line of lines) {
                    const cleanLine = line.trim();
                    if (!cleanLine || !cleanLine.startsWith("data: ")) continue;

                    const data = cleanLine.slice(6);
                    if (data === "[DONE]") {
                        setIsLoading(false);
                        break;
                    }

                    try {
                        const json = JSON.parse(data);
                        const content = json.choices[0]?.delta?.content || "";
                        if (content) {
                            assistantMessage.content += content;
                            setMessages((prev) => {
                                const newMessages = [...prev];
                                newMessages[newMessages.length - 1] = { ...assistantMessage };
                                return newMessages;
                            });
                        }
                    } catch (e) {
                        // Silently ignore parsing errors for partial/malformed lines in the stream
                        console.warn("Partial stream line ignored:", cleanLine);
                    }
                }
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "I apologize, but I'm having trouble connecting to the server right now. Please try again later or contact our support team directly." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 h-full min-h-0 bg-white relative overflow-hidden">
            {/* Background Texture - Minimalist dot pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
                style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="flex-1 container mx-auto max-w-4xl flex flex-col h-full relative z-10 min-h-0">
                {/* Header - Subtle and Minimal */}
                {hasStarted && (
                    <div className="p-4 md:p-6 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex items-center justify-between shrink-0 animate-in fade-in duration-500">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
                                <Bot className="h-5 w-5" />
                            </div>
                            <h1 className="font-semibold text-slate-800 tracking-tight">KGI Assistant</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Support</span>
                        </div>
                    </div>
                )}

                {/* Chat Area / Hero State */}
                <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar px-4 relative">
                    {!hasStarted ? (
                        <div className="flex flex-col items-center justify-center min-h-full pb-20">
                            <div className="text-center mb-12 animate-in fade-in zoom-in-95 duration-700">
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-4">
                                    Ready when you are.
                                </h2>
                                <p className="text-slate-500 text-lg font-light max-w-md mx-auto">
                                    I&apos;m here to assist with viscosity specs, export logistics, and technical gum data.
                                </p>
                            </div>

                            {/* Suggested Prompts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full animate-in slide-in-from-bottom-4 duration-1000">
                                {SUGGESTED_PROMPTS.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestedPrompt(item.prompt)}
                                        className="flex items-center gap-4 p-4 text-left rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-emerald-200 transition-all group shadow-sm hover:shadow-md"
                                    >
                                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-700">{item.title}</h3>
                                            <p className="text-xs text-slate-400 line-clamp-1">Explore technical standards</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                    ) : (
                        <div className="flex flex-col gap-6 py-10 max-w-2xl mx-auto min-h-full">
                            {messages.map((m, index) => (
                                <div key={index} className={cn(
                                    "flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                                    m.role === "user" ? "flex-row-reverse" : ""
                                )}>
                                    <div className={cn(
                                        "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border",
                                        m.role === "user"
                                            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                                            : "bg-slate-50 border-slate-100 text-slate-500"
                                    )}>
                                        {m.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                                    </div>
                                    <div className={cn(
                                        "relative group max-w-[85%] md:max-w-[80%]"
                                    )}>
                                        <div className={cn(
                                            "text-[15px] leading-relaxed",
                                            m.role === "user" ? "text-emerald-700 font-medium" : "text-slate-700"
                                        )}>
                                            <div className="prose prose-sm max-w-none break-words">
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                                                        strong: ({ children }) => <strong className="font-bold text-emerald-800">{children}</strong>,
                                                        a: ({ href, children }) => <a href={href} className="text-emerald-600 underline font-medium hover:text-emerald-500">{children}</a>,
                                                    }}
                                                >
                                                    {m.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-2 text-slate-400 py-4 italic text-sm">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Analyzing technical query...
                                </div>
                            )}
                            <div ref={scrollRef} className="h-4" />
                        </div>
                    )}
                </div>

                {/* Minimalist Input Area */}
                <div className="p-6 md:pb-12 md:pt-4">
                    <div className="max-w-3xl mx-auto">
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            className="relative flex items-center bg-white border border-slate-200 rounded-full p-2 shadow-2xl shadow-slate-300/20 transition-all focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-500/5 group"
                        >
                            {/* Left Action Icon */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0 ml-1"
                            >
                                <Plus className="h-5 w-5" />
                                <span className="sr-only">Attachments</span>
                            </Button>

                            <Input
                                placeholder="Ask anything"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none focus-visible:ring-0 text-slate-800 lg:text-lg placeholder:text-slate-300 h-12 px-4 italic font-light"
                                disabled={isLoading}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}

                            />

                            {/* Right Action Icons */}
                            <div className="flex items-center gap-1 pr-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 hidden sm:flex shrink-0"
                                >
                                    <Mic className="h-5 w-5" />
                                    <span className="sr-only">Voice</span>
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className={cn(
                                        "h-10 w-10 rounded-full transition-all active:scale-90 shrink-0",
                                        input.trim()
                                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                            : "bg-black text-white hover:bg-slate-800"
                                    )}
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <AudioLines className="h-5 w-5" />
                                    )}
                                    <span className="sr-only">Send</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );



}
