"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    Printer,
    Building2,
    Clock,
    Anchor,
    ShieldCheck,
    Globe
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { HeroCarousel } from "@/components/home/HeroCarousel";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    company: z.string().optional(),
    product: z.string().min(1, { message: "Please select or type a product of interest." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            product: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast.success("Inquiry Sent!", {
            description: "A technical sales specialist will contact you within 2 hours.",
        });
        form.reset();
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
                <HeroCarousel />
                <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom duration-700">
                        <span className="text-secondary font-mono tracking-widest uppercase text-sm font-bold bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm">Contact KGI</span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            Global Partnership <br />
                            <span className="text-secondary/90">Starts Here</span>
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed font-light">
                            Connect with Karachi Gum's technical sales team for custom specifications, bulk quotes, and global export support.
                        </p>
                    </div>
                </div>
            </section>

            <div className="py-24 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.02] -skew-x-12 transform translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">

                        {/* Contact Hub (Left Side) */}
                        <div className="lg:col-span-5 space-y-8 animate-in slide-in-from-left duration-700">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">Industrial Inquiry Hub</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our headquarters is strategically located in Karachi's industrial heart, ensuring maximum logistics efficiency for international shipping.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {/* Address Card */}
                                <div className="group p-6 rounded-2xl border bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold flex items-center gap-2">
                                                Main Plant & Office
                                                <span className="text-[10px] bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded uppercase font-bold tracking-tighter flex items-center gap-1">
                                                    <Anchor className="h-3 w-3" /> Port Proximity
                                                </span>
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Plot No. S/9, Shed No.3, Gulbai,<br />
                                                SITE, Karachi-75730, Pakistan.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Card */}
                                <div className="group p-6 rounded-2xl border bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold">Communication Lines</h3>
                                            <div className="text-muted-foreground text-sm space-y-1 font-mono">
                                                <p className="flex justify-between gap-4"><span>T:</span> <span>+92-21-32582771 / 62</span></p>
                                                <p className="flex justify-between gap-4"><span>F:</span> <span>+92-21-32582762</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Card */}
                                <div className="group p-6 rounded-2xl border bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold">Global Correspondence</h3>
                                            <div className="text-muted-foreground text-sm font-mono">
                                                <p className="hover:text-primary transition-colors">info@karachigum.com</p>
                                                <p className="hover:text-primary transition-colors">ssaleem@karachigum.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timezone Indicator */}
                            <div className="p-6 bg-muted rounded-2xl border border-dashed flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-sm font-medium">Karachi, PK (GMT+5)</span>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                        </div>

                        {/* Inquiry Center (Right Side) */}
                        <div className="lg:col-span-7 animate-in slide-in-from-right duration-700">
                            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
                                <div className="bg-primary p-8 text-primary-foreground relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                                    <h3 className="text-2xl font-bold relative z-10">Technical Inquiry Center</h3>
                                    <p className="opacity-80 text-sm mt-2 relative z-10">ISO 9001:2008 & HACCP Compliant Processing</p>
                                </div>
                                <CardContent className="p-8 md:p-12">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs font-bold uppercase tracking-wider opacity-60">Full Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="John Doe" className="bg-muted/50 h-12 focus-visible:ring-secondary border-none" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs font-bold uppercase tracking-wider opacity-60">Corporate Email</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="john@company.com" className="bg-muted/50 h-12 focus-visible:ring-secondary border-none" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="company"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs font-bold uppercase tracking-wider opacity-60">Company</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Your Company Ltd." className="bg-muted/50 h-12 focus-visible:ring-secondary border-none" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="product"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs font-bold uppercase tracking-wider opacity-60">Product Interest</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g. Guar Gum Powder" className="bg-muted/50 h-12 focus-visible:ring-secondary border-none" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs font-bold uppercase tracking-wider opacity-60">Technical Requirements</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Tell us about your mesh sizes, viscosity requirements (cps), and quantity..."
                                                                className="min-h-[150px] bg-muted/50 focus-visible:ring-secondary border-none resize-none"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="pt-4">
                                                <Button type="submit" className="w-full h-14 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all text-base font-bold shadow-xl border-none">
                                                    Submit Technical Inquiry <Send className="ml-2 h-5 w-5" />
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-center gap-6 pt-6 border-t border-muted opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                                                <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /><span className="text-[10px] font-bold">ISO CERTIFIED</span></div>
                                                <div className="flex items-center gap-1"><Globe className="h-4 w-4" /><span className="text-[10px] font-bold">GLOBAL EXPORT</span></div>
                                                <div className="flex items-center gap-1"><Building2 className="h-4 w-4" /><span className="text-[10px] font-bold">PLANT DIRECT</span></div>
                                            </div>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
