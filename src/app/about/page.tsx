import { HeroCarousel } from "@/components/home/HeroCarousel";
import {
    CheckCircle,
    Ship,
    Factory,
    Beaker,
    Globe2,
    ShieldCheck,
    Calendar,
    Package,
    ArrowRight,
    Users2,
    Microscope,
    Milestone
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <HeroCarousel />
                <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-3xl animate-in slide-in-from-bottom duration-700">
                        <span className="text-secondary font-mono tracking-widest uppercase text-sm mb-4 block">Corporate Profile</span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                            Karachi Gum Industry <br />
                            <span className="text-secondary/90">(KGI) Portrait</span>
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed font-light">
                            One of the leading and most reliable suppliers of high-quality guar-based products globally, established in 2000 at the heart of Karachi's port city.
                        </p>
                    </div>
                </div>
            </section>

            {/* Strategic Gateway - Port Proximity */}
            <section className="py-12 bg-muted border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-muted-foreground font-semibold">ESTABLISHED</span>
                                <span className="text-xl font-bold">Year 2000</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Ship className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-muted-foreground font-semibold">PORT PROXIMITY</span>
                                <span className="text-xl font-bold">7KM from KICT</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Milestone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-muted-foreground font-semibold">LOGISTICS HUB</span>
                                <span className="text-xl font-bold">40KM from Qasim Port</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Globe2 className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-muted-foreground font-semibold">HQ LOCATION</span>
                                <span className="text-xl font-bold">Karachi, Pakistan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Competency Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Integrated Manufacturing Excellence</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We operate complete integrated plants to produce high-quality Guar Gum across varieties—Food Grade, Industrial Grade, Guar Splits, and Guar Meal.
                                Our facility is designed for precision and scale to meet growing global demands.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {[
                                "ISO 9001:2008 Quality Management System",
                                "HACCP Code:2003 (Food Safety Management)",
                                "Halal Certified Production Lines",
                                "In-House Physical & Microbiology Labs"
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-4 p-4 rounded-xl border bg-card/50 hover:bg-card transition-colors group">
                                    <ShieldCheck className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold text-foreground/90">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-primary/10 shadow-2xl bg-muted">
                            <Image src="/Hero/hero3.jpg" alt="Production Facility" fill className="object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-primary/5 hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                                    <Factory className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">27,800+</p>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Tons Capacity / Year</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Production Capacity Dashboard */}
            <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mt-48" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Production Powerhouse</h2>
                        <p className="text-primary-foreground/70 max-w-2xl mx-auto italic">
                            Scaling industrial output without compromising technical specifications.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Powder Dashboard */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Package className="h-5 w-5 text-secondary" /> Guar Gum Powder
                            </h3>
                            <div className="mb-6">
                                <span className="text-4xl font-mono font-bold">4,500</span>
                                <span className="text-sm opacity-60 ml-2">Tons / Annum</span>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-xs uppercase font-bold text-secondary mb-1">Food Grade</p>
                                    <p className="text-xs opacity-80">200 Mesh | 3000 – 6500 cps</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-secondary mb-1">Industrial Grade</p>
                                    <p className="text-xs opacity-80">200 Mesh | 2000 – 7000 cps</p>
                                </div>
                            </div>
                        </div>

                        {/* Splits Dashboard */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Beaker className="h-5 w-5 text-secondary" /> Purified Splits
                            </h3>
                            <div className="mb-6">
                                <span className="text-4xl font-mono font-bold">7,300</span>
                                <span className="text-sm opacity-60 ml-2">Tons / Annum</span>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold">Dehusked Rate:</span>
                                    <span className="font-mono text-secondary">90 – 98%</span>
                                </div>
                                <p className="text-xs opacity-70 leading-relaxed">
                                    Refined base material for high-clarity viscosifiers.
                                </p>
                            </div>
                        </div>

                        {/* Meal Dashboard */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Users2 className="h-5 w-5 text-secondary" /> Guar Protein/Meal
                            </h3>
                            <div className="mb-6">
                                <span className="text-4xl font-mono font-bold">16,000</span>
                                <span className="text-sm opacity-60 ml-2">Tons / Annum</span>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold">Protein Rate:</span>
                                    <span className="font-mono text-secondary">Min. 38%</span>
                                </div>
                                <p className="text-xs opacity-70 leading-relaxed">
                                    Available in Toasted & Untoasted for Global Poultry/Cattle markets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Science: Mannogalactan */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <div className="inline-block p-4 bg-primary/5 rounded-full mb-6">
                        <Microscope className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">The Science of Mannogalactan</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                        Guar Gum Powder is a highly purified polysaccharide. Its polymer molecule consists of a mannose chain with Galactose branches. This unique structure makes it a versatile <strong>cold-water soluble hydrocolloid</strong>.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[
                            "Stabilizer", "Thickener", "Binder", "Dispersant", "Viscosifier",
                            "Suspending Agent", "Water Blocker", "Jelling Agent", "Flocculent", "Coagulant"
                        ].map((prop) => (
                            <div key={prop} className="p-4 rounded-xl border bg-muted/30 text-xs font-bold uppercase tracking-tight hover:bg-primary hover:text-white transition-all cursor-default">
                                {prop}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Infrastructure */}
            <section className="py-24 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="bg-card rounded-[3rem] p-12 lg:p-20 shadow-sm border overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2" />
                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold">In-House Quality Control Lab</h2>
                                <div className="space-y-6">
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        Our dedicated facility features independent <strong>Microbiology</strong> and <strong>Physical Laboratories</strong>, professionally managed by qualified research staff.
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            "Raw Material Validation",
                                            "Finished Product Testing",
                                            "Latest Measuring Equipment",
                                            "Accurate Traceable Results"
                                        ].map((li) => (
                                            <li key={li} className="flex items-center gap-2 text-sm font-semibold">
                                                <CheckCircle className="h-4 w-4 text-secondary" /> {li}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-muted aspect-video rounded-3xl overflow-hidden relative border shadow-inner">
                                <Image src="/Hero/hero4.jpg" alt="Quality Lab" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logistics & Packing Specifications */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center underline decoration-secondary underline-offset-8">Logistics & Global Fulfillment</h2>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Markets */}
                        <div className="space-y-6 border-r pr-8 hidden lg:block">
                            <h3 className="text-xl font-bold">Main Export Markets</h3>
                            <div className="flex flex-wrap gap-2">
                                {["China", "Middle East", "South Africa", "Europe"].map((m) => (
                                    <span key={m} className="px-4 py-2 bg-muted rounded-full text-sm font-bold flex items-center gap-2">
                                        <Globe2 className="h-4 w-4 text-primary" /> {m}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-8 p-4 bg-muted/50 rounded-xl italic">
                                "Highly technical management staff maintaining top quality inventory for immediate delivery."
                            </p>
                        </div>

                        {/* Packing Specs Table */}
                        <div className="lg:col-span-2 overflow-x-auto">
                            <table className="w-full text-left border-collapse bg-card rounded-2xl overflow-hidden">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="p-4 font-mono text-xs uppercase tracking-tighter">Product</th>
                                        <th className="p-4 font-mono text-xs uppercase tracking-tighter">Packaging</th>
                                        <th className="p-4 font-mono text-xs uppercase tracking-tighter">Capacity (1x20' FCL)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b transition-colors hover:bg-muted/30">
                                        <td className="p-4 font-bold">Guar Gum</td>
                                        <td className="p-4 text-sm text-muted-foreground">Multiple Kraft paper bags (25 Kgs)</td>
                                        <td className="p-4 text-sm font-mono font-bold">800 Bags = 20MT</td>
                                    </tr>
                                    <tr className="border-b transition-colors hover:bg-muted/30">
                                        <td className="p-4 font-bold">Guar Splits</td>
                                        <td className="p-4 text-sm text-muted-foreground">Polypropylene bags + Liner (50 Kgs)</td>
                                        <td className="p-4 text-sm font-mono font-bold">400 Bags = 20MT</td>
                                    </tr>
                                    <tr className="transition-colors hover:bg-muted/30">
                                        <td className="p-4 font-bold">Guar Meal</td>
                                        <td className="p-4 text-sm text-muted-foreground">Polypropylene bags + Liner (50 Kgs)</td>
                                        <td className="p-4 text-sm font-mono font-bold">400 Bags = 20MT</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="mt-4 text-xs text-muted-foreground italic px-2">
                                * Packing can be marked and branded according to customer requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Reassurance CTA */}
            <section className="py-20 border-t">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h2 className="text-3xl font-bold">Excellence in Quality, Price & Delivery</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        We thank you for your precious time and look forward to receiving a query from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-primary h-14 px-8">
                            <Link href="/contact">Get in Touch <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-8" asChild>
                            <a href="mailto:ssaleem@karachigum.com">Contact Sales Specialist</a>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}

