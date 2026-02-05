import { Button } from "@/components/ui/button";
import { CheckCircle, Microscope, ClipboardCheck, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroCarousel } from "@/components/home/HeroCarousel";

export default function QualityControlPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <HeroCarousel />
                <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
                <div className="container relative z-10 mx-auto px-4 text-center text-primary-foreground">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 animate-in slide-in-from-bottom duration-700">Quality Control</h1>
                    <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-700 delay-100">
                        Uncompromising standards. Rigorous testing. Delivering purity you can trust.
                    </p>
                </div>
            </section>

            {/* Quality Policy Statement */}
            <section className="py-16 bg-background border-b">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-primary/5 border border-primary/10 p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden">
                        {/* Decorative Quote Mark */}
                        <div className="absolute top-8 left-8 text-primary/10 select-none">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 2H16.017L22.017 2V12C22.017 16.9706 17.9876 21 13.017 21H11.017L11.017 19L13.017 19C13.5693 19 14.017 18.5523 14.017 18L14.017 21ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H4.017C2.91243 8 2.017 7.10457 2.017 6V3L2.017 2H4.017L10.017 2V12C10.017 16.9706 5.98763 21 1.017 21H-0.983L-0.983 19L1.017 19C1.56928 19 2.017 18.5523 2.017 18L2.017 21Z" />
                            </svg>
                        </div>

                        <div className="relative z-10 text-center space-y-6">
                            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-primary font-bold">Official Quality Policy</h2>
                            <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight italic">
                                "Karachi Gum Industry is committed to manufacture and market guar based products which fulfill the customer’s need and regulatory requirement."
                            </p>
                            <div className="w-20 h-1 bg-secondary mx-auto" />
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                Our Quality Management and HACCP system is designed to ensure the <strong>continual improvement</strong> of the product quality standard through evaluation, inspection, and verification of processes at all stages of manufacturing.
                            </p>
                            <p className="text-sm font-semibold text-primary/80 uppercase tracking-wider italic">
                                — Empowered through active employee involvement & training
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Process */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
                            <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                                <ClipboardCheck className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Raw Material Inspection</h3>
                            <p className="text-muted-foreground">
                                Every batch of Guar seeds is meticulously inspected for size, color, and impurity content before processing begins.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
                            <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                                <Microscope className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Laboratory Testing</h3>
                            <p className="text-muted-foreground">
                                Our state-of-the-art lab tests for viscosity, pH, hydration rate, and microbial counts to ensure precise specifications.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
                            <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                                <Award className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Final Certification</h3>
                            <p className="text-muted-foreground">
                                Products are certified with COA (Certificate of Analysis) and comply with ISO 9001:2015, HACCP, and GMP standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testing Parameters */}
            <section className="bg-muted/30 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Our Testing Parameters</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="space-y-4">
                            {["Viscosity (Brookfield Viscometer)", "Moisture Content", "pH Level", "Particle Size Analysis (Mesh)", "Protein Content"].map((item) => (
                                <div key={item} className="flex items-center gap-3 bg-background p-4 rounded-lg border">
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            {["Acid Insoluble Residue (A.I.R)", "Total Plate Count", "Yeast & Mold", "Heavy Metals Analysis", "Salmonella / E. Coli Negative"].map((item) => (
                                <div key={item} className="flex items-center gap-3 bg-background p-4 rounded-lg border">
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary text-primary-foreground py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Request a Quality Report?</h2>
                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        We are happy to provide sample COAs and technical datasheets for your review.
                    </p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/contact">
                            Contact Quality Team <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
