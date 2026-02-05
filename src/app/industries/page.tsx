import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Factory, Droplets, Wheat, Briefcase, ArrowRight } from "lucide-react";

import { HeroCarousel } from "@/components/home/HeroCarousel";

const industries = [
    {
        name: "Oil & Gas",
        icon: Droplets,
        description: "Essential rheology modifier for hydraulic fracturing and drilling fluids. Increases viscosity and proppant transport.",
        products: ["Fast Hydration Guar Gum", "Industrial Grade"]
    },
    {
        name: "Food & Beverage",
        icon: Wheat,
        description: "Natural thickener, stabilizer, and emulsifier for bakery, dairy, juices, and processed meats.",
        products: ["Food Grade Guar Gum", "Cassia Tora"]
    },
    {
        name: "Paper & Textile",
        icon: Factory,
        description: "Improves sheet formation in paper and ensures precise printing and sizing in textiles.",
        products: ["Industrial Grade", "Custom Viscosity Blends"]
    },
    {
        name: "Mining & Explosives",
        icon: Briefcase,
        description: "Used as a flocculant in ore processing and as a gelling agent in slurry explosives for water resistance.",
        products: ["Industrial Grade", "Derivatized Guar"]
    }
];

export default function IndustriesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <HeroCarousel />
                <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
                <div className="container relative z-10 mx-auto px-4 text-center text-primary-foreground px-4 text-center max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight mb-6 animate-in slide-in-from-bottom duration-700">Industries We Serve</h1>
                    <p className="text-lg text-primary-foreground/90 animate-in slide-in-from-bottom duration-700 delay-100">
                        Our versatile chemical solutions power critical processes across diverse global sectors.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {industries.map((industry) => (
                        <div key={industry.name} className="flex flex-col p-8 rounded-xl border bg-card hover:border-primary/50 transition-colors group">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                <industry.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{industry.name}</h3>
                            <p className="text-muted-foreground mb-6 flex-1 text-lg">
                                {industry.description}
                            </p>

                            <div className="mt-auto">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recommended Products</h4>
                                <div className="flex flex-wrap gap-2">
                                    {industry.products.map((p) => (
                                        <Link key={p} href={`/products`} className="text-sm font-medium text-primary hover:underline bg-primary/5 px-2 py-1 rounded">
                                            {p}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-primary/5 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Don't see your industry?</h2>
                    <p className="text-muted-foreground mb-8">
                        We specialize in custom formulations. Contact our R&D team to develop a solution for your specific application.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contact">Talk to an Expert <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
