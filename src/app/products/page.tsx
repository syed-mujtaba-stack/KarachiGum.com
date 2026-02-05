import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

import { HeroCarousel } from "@/components/home/HeroCarousel";

const products = [
    {
        id: "guar-seeds",
        name: "Guar Seeds",
        description: "Premium quality raw Guar seeds sourced directly from sustainable farms.",
        features: ["High Purity", "Natural Grade", "Farming Source"],
        image: "/Products/GuarSeeds.jpg",
        slug: "guar-seeds"
    },
    {
        id: "guar-splits",
        name: "Guar Splits",
        description: "Refined splits obtained from de-husked Guar seeds, ready for gum processing.",
        features: ["High Viscosity Potential", "Low Impurity", "Consistent Quality"],
        image: "/Products/GuarSplits.jpg",
        slug: "guar-splits"
    },
    {
        id: "guar-meal-churi",
        name: "Guar Meal Churi",
        description: "High-protein animal feed supplement derived from the Guar milling process.",
        features: ["Protein Rich", "Livestock Feed", "Cost Effective"],
        image: "/Products/GuarMealChuri.jpg",
        slug: "guar-meal-churi"
    },
    {
        id: "guar-meal-korma",
        name: "Guar Meal Korma",
        description: "Premium high-protein granular meal processed for poultry and cattle feed usage.",
        features: ["Max Protein Content", "Granular Form", "Digestible Energy"],
        image: "/Products/GuarMealKorma.jpg",
        slug: "guar-meal-korma"
    },
    {
        id: "guar-gum-powder",
        name: "Guar Gum Powder",
        description: "Versatile thickening and binding agent for food, industrial, and oil & gas applications.",
        features: ["Food & Industrial Grade", "Custom Mesh Size", "High Viscosity"],
        image: "/Products/GuarGumPowder.jpg",
        slug: "guar-gum-powder"
    }
];

export default function ProductsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden border-b">
                <HeroCarousel />
                <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
                <div className="container relative z-10 mx-auto px-4 text-center text-primary-foreground">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 animate-in slide-in-from-bottom duration-700">Our Products</h1>
                    <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-700 delay-100">
                        From raw seeds to refined powder, we offer the complete range of Guar Gum products.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="relative aspect-video w-full border-b bg-muted">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-6">
                                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                    <Link href={`/products/${product.slug}`}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="text-muted-foreground mb-6 flex-1">
                                    {product.description}
                                </p>
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                                    <ul className="space-y-1">
                                        {product.features.map((feature) => (
                                            <li key={feature} className="flex items-center text-sm text-muted-foreground">
                                                <Check className="h-4 w-4 mr-2 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button asChild className="w-full">
                                    <Link href={`/products/${product.slug}`}>
                                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Orders Section */}
            <section className="bg-primary text-primary-foreground py-16 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Bulk Quantities?</h2>
                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        We specialize in large-scale export orders with competitive pricing and reliable logistics.
                    </p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/contact">Get a Quote</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
