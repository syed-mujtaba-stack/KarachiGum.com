import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, ShieldCheck, Truck, Bot } from "lucide-react";
import Image from "next/image";

import { HeroCarousel } from "@/components/home/HeroCarousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
        <HeroCarousel />

        <div className="container relative z-10 mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-white animate-in slide-in-from-left duration-700">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Premium Industrial <br />
              <span className="text-secondary">Guar Gum</span> Solutions
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg">
              Global leaders in manufacturing and exporting high-quality Guar Gum powder for food, industrial, and technical applications.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-none shadow-lg">
                <Link href="/contact">
                  Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white/30 bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-sm">
                <Link href="/chat">
                  <Bot className="mr-2 h-4 w-4" /> Talk to AI Assistant
                </Link>
              </Button>
            </div>
          </div>
          {/* Placeholder for Hero Graphic - Optional now with full background, but keeping for balance or removing? 
              User asked to "add all images", implicitly replacing the section content might be too aggressive if they just wanted a background.
              Given the previous layout had a "gradient placeholder", I'll keep the text layout but let the images shine. 
              The right side was a placeholder box. I will remove it to show more image, 
              OR keep it if it contains important stats. The previous one had "Serving 50+ Countries".
              I'll render a smaller stat card instead of the big box to obscure less of the image.
           */}
          <div className="hidden md:flex justify-center animate-in slide-in-from-right duration-700">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-white text-center shadow-2xl">
              <Globe className="h-16 w-16 mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl font-bold mb-2">Global Reach</h3>
              <p className="opacity-90">Serving 50+ Countries</p>
              <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 justify-center">
                <div>
                  <span className="block font-bold text-xl">ISO</span>
                  <span className="text-xs opacity-75">Certified</span>
                </div>
                <div>
                  <span className="block font-bold text-xl">100%</span>
                  <span className="text-xs opacity-75">Organic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome & About Guar Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-secondary font-bold tracking-wider text-sm uppercase">Welcome to KGI</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Karachi Gum Industry
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Thank you for visiting the KGI website and taking interest in our company and our Guar-based products. We are dedicated to delivering excellence in every grain.
            </p>
            <div className="p-6 bg-muted/30 rounded-lg border border-border/50">
              <h3 className="text-xl font-semibold mb-3 text-primary">What is Guar Gum?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Guar Gum is a <strong>polysaccharide</strong> derived from the seed of the guar plant, <em>Cyamopsis tetragonoloba</em>. It belongs to the vast family of <em>Leguminosae</em>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                It is an agricultural crop grown primarily during the monsoon season (July to September) in the Indo-Pak subcontinent. In Pakistan, <strong>Sindh</strong> and <strong>Punjab</strong> are the main regions for raw Guar bean production.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-muted border">
              {/* Placeholder for a Guar Plant image if available, or use a generic industry one */}
              <Image src="/Hero/hero2.jpg" alt="Guar Cultivation" fill className="object-cover" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-4 bg-primary/5 rounded-lg flex-1 border border-primary/10">
                <h4 className="font-semibold text-foreground mb-2">Climate Resilient</h4>
                <p className="text-sm text-muted-foreground">
                  Grown in areas with low rainfall (400-900 mm) in 2-3 spells. Requires significantly less water than other crops, making it a sustainable choice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guar Gum Industry Technical Section */}
      <section className="py-16 bg-muted/50 border-y">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Guar Gum Industry</h2>
          <div className="bg-card p-8 rounded-2xl shadow-sm border text-left">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Guar gum shows <strong>high low-shear viscosity</strong> but is strongly <strong>shear-thinning</strong>. It is very <strong>thixotropic</strong> above concentration 1%, but below 0.3% the thixotropy is slight.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              It has much greater low-shear viscosity than that of <em>locust bean gum</em>, and also generally greater than that of other hydrocolloids. Guar gum shows <strong>viscosity synergy</strong> with xanthan gum. Guar gum and micellar casein mixtures can be slightly thixotropic if a biphase system forms.
            </p>
            <div className="flex justify-start">
              <Button asChild variant="link" className="px-0 text-primary font-semibold text-lg hover:underline">
                <Link href="/products">Learn more <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Karachi Gum?</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We combine decades of expertise with modern processing technology to deliver consistency and quality.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ISO Certified Quality</h3>
              <p className="text-muted-foreground">Rigorous quality control processes ensuring every batch meets international standards.</p>
            </div>
            <div className="bg-card p-8 rounded-lg border shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Export Ready</h3>
              <p className="text-muted-foreground">Specialized logistics team handling documentation and shipping to over 50 countries.</p>
            </div>
            <div className="bg-card p-8 rounded-lg border shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliable Supply Chain</h3>
              <p className="text-muted-foreground">Consistent availability and on-time delivery for large-scale industrial requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Products</h2>
              <p className="mt-2 text-muted-foreground">Tailored solutions for diverse industries</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Product B2B Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">

            {/* HEROL: Flagship Product - Guar Gum Powder (Spans 8 cols on large screens) */}
            <Link href="/products/guar-gum-powder" className="group lg:col-span-8 relative overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full bg-muted">
                <Image
                  src="/Products/GuarGumPowder.jpg"
                  alt="Guar Gum Powder"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r" />
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <span className="text-xs font-mono uppercase tracking-wider bg-primary/90 px-2 py-1 rounded mb-2 inline-block">Flagship</span>
                </div>
              </div>
              <div className="flex-1 p-8 flex flex-col justify-center bg-card relative">
                <div className="hidden md:block mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary border border-primary/30 px-2 py-1 rounded">Global Export Standard</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Guar Gum Powder</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  High-viscosity, industrial-grade binding & thickening agent. Essential for Oil & Gas, Food, and Textile industries.
                </p>

                {/* Tech Specs Preview */}
                <div className="grid grid-cols-2 gap-4 mb-8 bg-muted/50 p-4 rounded-lg border border-border/50">
                  <div>
                    <span className="block text-xs uppercase text-muted-foreground font-semibold">Viscosity</span>
                    <span className="font-mono text-sm font-bold text-foreground">3500 - 8000 cps</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase text-muted-foreground font-semibold">Mesh Size</span>
                    <span className="font-mono text-sm font-bold text-foreground">100 / 200 Mesh</span>
                  </div>
                </div>

                <div className="flex items-center text-primary font-bold tracking-tight mt-auto">
                  View Technical Grades <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* SECONDARY GROUP: Raw Materials (Stacked vertically on right, spans 4 cols) */}
            <div className="lg:col-span-4 grid gap-6 grid-rows-2">

              {/* Product 2: Guar Splits */}
              <Link href="/products/guar-splits" className="group relative overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-end p-6 h-[250px]">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/Products/GuarSplits.jpg"
                    alt="Guar Splits"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="relative z-10 text-white">
                  <span className="text-xs font-mono text-secondary mb-1 block">Raw Material</span>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-secondary transition-colors">Guar Splits</h3>
                  <p className="text-sm text-gray-300 line-clamp-1">Refined de-husked splits for processing.</p>
                </div>
              </Link>

              {/* Product 3: Guar Seeds */}
              <Link href="/products/guar-seeds" className="group relative overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-end p-6 h-[250px] bg-muted">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/Products/GuarSeeds.jpg"
                    alt="Guar Seeds"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="relative z-10 text-white">
                  <span className="text-xs font-mono text-secondary mb-1 block">Origin Source</span>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-secondary transition-colors">Guar Seeds</h3>
                  <p className="text-sm text-gray-300 line-clamp-1">Directly sourced non-GMO seeds.</p>
                </div>
              </Link>
            </div>

            {/* TERTIARY GROUP: Animal Nutrition (Spans 6 cols each on large) */}
            <Link href="/products/guar-meal-churi" className="group lg:col-span-6 relative overflow-hidden rounded-2xl border bg-muted/30 hover:bg-card hover:border-primary/30 transition-all p-6 flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-border">
                <Image src="/Products/GuarMealChuri.jpg" alt="Guar Meal Churi" fill className="object-cover" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-muted-foreground/80 mb-1 block">Animal Nutrition</span>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">Guar Meal Churi</h3>
                <p className="text-sm text-muted-foreground mb-2">High-protein powder for poultry feed.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">Protein Rich</span>
                  <span className="text-[10px] bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded border border-secondary">Cost Effective</span>
                </div>
              </div>
            </Link>

            <Link href="/products/guar-meal-korma" className="group lg:col-span-6 relative overflow-hidden rounded-2xl border bg-muted/30 hover:bg-card hover:border-primary/30 transition-all p-6 flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-border">
                <Image src="/Products/GuarMealKorma.jpg" alt="Guar Meal Korma" fill className="object-cover" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-muted-foreground/80 mb-1 block">High Grade Feed</span>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">Guar Meal Korma</h3>
                <p className="text-sm text-muted-foreground mb-2">Granular high-protein cattle feed.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">Max Protein</span>
                  <span className="text-[10px] bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded border border-secondary">Digestible</span>
                </div>
              </div>
            </Link>

          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
        {/* Subtle Background Pattern Placeholder */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Narrative & Trust */}
            <div className="lg:col-span-7 space-y-8 animate-in slide-in-from-left duration-700">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                  Ready to Secure Your <br />
                  <span className="text-secondary">Industrial Supply Chain?</span>
                </h2>
                <p className="text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
                  Directly sourcing from KGI ensures consistent viscosity, competitive pricing, and 100% traceability for your global operations.
                </p>
              </div>

              {/* Trust Indicators Grid */}
              <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="text-sm">
                    <span className="block font-bold">50+ Countries</span>
                    <span className="opacity-70">Export Network</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="text-sm">
                    <span className="block font-bold">ISO Certified</span>
                    <span className="opacity-70">Lab Quality Control</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="text-sm">
                    <span className="block font-bold">24/7 Digital</span>
                    <span className="opacity-70">Technical Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Action Center */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 lg:ml-auto max-w-md">
                <h3 className="text-2xl font-semibold mb-2">Partner with KGI</h3>
                <p className="text-primary-foreground/70 text-sm mb-6">
                  Connect with our export specialist or get an instant specification match via our AI assistant.
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 border-none shadow-xl h-14 text-base font-bold">
                    <Link href="/contact" className="flex items-center justify-center">
                      Request Technical Quote <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full text-white border-white/20 bg-white/5 hover:bg-white/10 h-14 text-base">
                    <Link href="/chat" className="flex items-center justify-center">
                      <Bot className="mr-2 h-5 w-5" /> Talk to Industrial AI
                    </Link>
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-[11px] opacity-40 uppercase tracking-widest mt-4">Average response time: &lt; 2 Hours</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
