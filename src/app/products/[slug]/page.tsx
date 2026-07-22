import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Hardcoded fallback data in case backend API is not running
const FALLBACK_PRODUCTS: Record<string, any> = {
    "guar-seeds": {
        name: "Guar Seeds",
        category: "Raw Material",
        image_url: "/Products/GuarSeeds.jpg",
        description: "Guar Seeds (Cyamopsis tetragonoloba) are the raw material for Guar Gum production. Sourced from the finest farms in Pakistan, our seeds are selected for their high purity and gum content.",
        specs: [
            { label: "Purity", value: "98% Min" },
            { label: "Moisture", value: "Max 10%" },
            { label: "Foreign Matter", value: "Max 1%" },
            { label: "Gum Content", value: "28-30%" }
        ],
        applications: [
            { application: "Guar Gum Manufacturing" },
            { application: "Agriculture (Seeding)" },
            { application: "Animal Feed (Whole)" }
        ]
    },
    "guar-splits": {
        name: "Guar Splits",
        category: "Intermediate Product",
        image_url: "/Products/GuarSplits.jpg",
        description: "Guar Splits are the endosperm of the Guar seed, separated from the husk and germ. They are the primary source for manufacturing high-quality Guar Gum powder.",
        specs: [
            { label: "De-husked Splits", value: "98% Min" },
            { label: "Moisture", value: "Max 10%" },
            { label: "Protein", value: "4.0 - 5.0%" },
            { label: "Gum (Galactomannan)", value: "80 - 82%" }
        ],
        applications: [
            { application: "Food Grade Gum Production" },
            { application: "Industrial Gum Production" },
            { application: "Textile Processing" }
        ]
    },
    "guar-meal-churi": {
        name: "Guar Meal Churi",
        category: "Animal Feed",
        image_url: "/Products/GuarMealChuri.jpg",
        description: "Guar Churi is a byproduct of Guar splitting, rich in protein and carbohydrates. It is widely used as a nutritious cattle feed supplement.",
        specs: [
            { label: "Protein", value: "35 - 38%" },
            { label: "Moisture", value: "Max 10%" },
            { label: "Fat / Oil", value: "4 - 5%" },
            { label: "Fiber", value: "Max 15%" }
        ],
        applications: [
            { application: "Cattle Feed" },
            { application: "Livestock Nutrition" },
            { application: "Poultry Feed Mix" }
        ]
    },
    "guar-meal-korma": {
        name: "Guar Meal Korma",
        category: "Animal Feed",
        image_url: "/Products/GuarMealKorma.jpg",
        description: "Guar Korma is the high-protein germ part of the Guar seed. It is a premium feed ingredient, often roasted (to remove anti-nutritional factors) for better digestibility.",
        specs: [
            { label: "Protein", value: "50 - 55%" },
            { label: "Moisture", value: "Max 10%" },
            { label: "Fat", value: "5 - 7%" },
            { label: "Profat", value: "Min 55%" }
        ],
        applications: [
            { application: "High-Protein Poultry Feed" },
            { application: "Aqua Feed" },
            { application: "Swine Feed" }
        ]
    },
    "guar-gum-powder": {
        name: "Guar Gum Powder",
        category: "Finished Product",
        image_url: "/Products/GuarGumPowder.jpg",
        description: "Our flagship product, Guar Gum Powder, is a versatile thickener and stabilizer used across food, oil drilling, paper, and textile industries.",
        specs: [
            { label: "Viscosity (2 hrs)", value: "3500 - 7000 CPS" },
            { label: "Moisture", value: "Max 12%" },
            { label: "pH", value: "5.5 - 7.0" },
            { label: "Particle Size", value: "100 - 300 Mesh" }
        ],
        applications: [
            { application: "Food (Bakery, Dairy, Sauces)" },
            { application: "Oil & Gas (Fracturing Fluids)" },
            { application: "Paper Manufacturing" },
            { application: "Textile Printing" }
        ]
    }
};

interface ProductSpec {
    label: string;
    value: string;
}

interface ProductApplication {
    application: string;
}

interface Product {
    id?: number;
    name: string;
    slug: string;
    category: string;
    image_url: string | null;
    description: string;
    specs: ProductSpec[];
    applications: ProductApplication[];
}

async function getProductBySlug(slug: string): Promise<Product | null> {
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    try {
        const res = await fetch(`${APP_URL}/api/admin/products`, {
            cache: "no-store",
            headers: {
                "Accept": "application/json",
            }
        });
        if (res.ok) {
            const allProducts = await res.json();
            const found = allProducts.find((p: any) => p.slug === slug);
            if (found) {
                return {
                    id: found.id || found._id,
                    name: found.name,
                    slug: found.slug,
                    category: found.category,
                    image_url: found.image_url,
                    description: found.description,
                    specs: found.specs || [],
                    applications: Array.isArray(found.applications) 
                        ? found.applications.map((app: any) => typeof app === 'string' ? { application: app } : app)
                        : []
                };
            }
        }
        return null;
    } catch (e) {
        console.warn("API not reachable. Falling back to local static catalog item.", e);
        return null;
    }
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    
    // Attempt dynamic fetch from Admin API
    const apiProduct = await getProductBySlug(slug);
    
    // Resolve static fallback if dynamic fetch returned null
    const product = apiProduct || FALLBACK_PRODUCTS[slug];

    if (!product) {
        notFound();
    }


    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const imageSrc = product.image_url
        ? (product.image_url.startsWith('http') ? product.image_url : (product.image_url.startsWith('/') ? product.image_url : `${API_URL}${product.image_url}`))
        : `/Products/${slug}.jpg`;

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Main Image */}
                    <div className="space-y-4">
                        <div className="relative aspect-square w-full bg-muted rounded-lg border overflow-hidden">
                            <img
                                src={imageSrc}
                                alt={product.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                                {product.category}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-slate-800">{product.name}</h1>
                        <p className="text-base text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
                            {product.description}
                        </p>

                        {/* Specifications Table */}
                        {product.specs && product.specs.length > 0 && (
                            <div className="bg-card border rounded-lg overflow-hidden mb-8">
                                <div className="px-6 py-4 border-b bg-muted/30">
                                    <h3 className="font-semibold">Technical Specifications</h3>
                                </div>
                                <div className="divide-y">
                                    {product.specs.map((spec: any, idx: number) => (
                                        <div key={idx} className="grid grid-cols-2 px-6 py-3 text-sm">
                                            <span className="text-muted-foreground">{spec.label}</span>
                                            <span className="font-medium text-right text-slate-800">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Applications */}
                        {product.applications && product.applications.length > 0 && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-lg mb-4">Common Applications</h3>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {product.applications.map((app: any, idx: number) => (
                                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                                            <CheckCircle2 className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                                            {app.application}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t">
                            <Button size="lg" className="w-full sm:w-auto" asChild>
                                <Link href="/contact">Request Pricing</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                                <Link href="/chat">
                                    Ask AI Assistant
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
