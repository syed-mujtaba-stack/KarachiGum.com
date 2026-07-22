import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

import { HeroCarousel } from "@/components/home/HeroCarousel";

// Hardcoded fallback data in case backend API is not running
const FALLBACK_PRODUCTS = [
    {
        id: 1,
        name: "Guar Seeds",
        description: "Premium quality raw Guar seeds sourced directly from sustainable farms.",
        features: ["High Purity", "Natural Grade", "Farming Source"],
        image_url: "/Products/GuarSeeds.jpg",
        slug: "guar-seeds",
        category: "Raw Material"
    },
    {
        id: 2,
        name: "Guar Splits",
        description: "Refined splits obtained from de-husked Guar seeds, ready for gum processing.",
        features: ["High Viscosity Potential", "Low Impurity", "Consistent Quality"],
        image_url: "/Products/GuarSplits.jpg",
        slug: "guar-splits",
        category: "Intermediate Product"
    },
    {
        id: 3,
        name: "Guar Meal Churi",
        description: "High-protein animal feed supplement derived from the Guar milling process.",
        features: ["Protein Rich", "Livestock Feed", "Cost Effective"],
        image_url: "/Products/GuarMealChuri.jpg",
        slug: "guar-meal-churi",
        category: "Animal Feed"
    },
    {
        id: 4,
        name: "Guar Meal Korma",
        description: "Premium high-protein granular meal processed for poultry and cattle feed usage.",
        features: ["Max Protein Content", "Granular Form", "Digestible Energy"],
        image_url: "/Products/GuarMealKorma.jpg",
        slug: "guar-meal-korma",
        category: "Animal Feed"
    },
    {
        id: 5,
        name: "Guar Gum Powder",
        description: "Versatile thickening and binding agent for food, industrial, and oil & gas applications.",
        features: ["Food & Industrial Grade", "Custom Mesh Size", "High Viscosity"],
        image_url: "/Products/GuarGumPowder.jpg",
        slug: "guar-gum-powder",
        category: "Finished Product"
    }
];

interface ProductSpec {
    label: string;
    value: string;
}

interface ProductApplication {
    application: string;
}

interface Product {
    id?: number | string;
    _id?: string;
    name: string;
    slug: string;
    category: string;
    image_url: string | null;
    image?: string | null;
    description: string;
    specs?: ProductSpec[];
    applications?: ProductApplication[];
    features?: string[];
}

async function getProducts(): Promise<Product[]> {
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    try {
        const res = await fetch(`${APP_URL}/api/admin/products`, {
            cache: "no-store", // Get fresh dynamic data
            headers: {
                "Accept": "application/json",
            }
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        return await res.json();
    } catch (e) {
        console.warn("API not reachable. Falling back to local static catalog.", e);
        return [];
    }
}

export default async function ProductsPage() {
    const apiProducts = await getProducts();
    
    // Map API products or use fallbacks
    const products = apiProducts.length > 0 
        ? apiProducts.map(p => ({
            id: p.id || p._id || p.slug,
            name: p.name,
            description: p.description,
            slug: p.slug,
            category: p.category,
            image_url: p.image_url || `/Products/${p.slug}.jpg`,
            features: p.features && p.features.length > 0 ? p.features : (p.specs ? p.specs.slice(0, 3).map(s => `${s.label}: ${s.value}`) : [])
          }))
        : FALLBACK_PRODUCTS;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


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
                    {products.map((product) => {
                        const imageSrc = product.image_url?.startsWith('http') 
                            ? product.image_url 
                            : product.image_url?.startsWith('/') ? product.image_url : `${API_URL}${product.image_url}`;
                        
                        return (
                            <div key={product.id} className="group flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                <div className="relative aspect-video w-full border-b bg-muted">
                                    <img
                                        src={imageSrc}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 p-6">
                                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                        <Link href={`/products/${product.slug}`}>
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="text-muted-foreground mb-6 flex-1 text-sm line-clamp-3">
                                        {product.description}
                                    </p>
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                                        <ul className="space-y-1">
                                            {product.features?.map((feature) => (
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
                        );
                    })}
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
