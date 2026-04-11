import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Battery, Gauge, Zap, CheckCircle2 } from "lucide-react";

import { products } from "@/data/products";
import { SpecsTable } from "@/components/SpecsTable";
import { EMICalculator } from "@/components/EMICalculator";

// Pre-render all products at build time
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.name} Price, Specs & Range | Bondhu Motor`,
    description: `Buy ${product.name} in South 24 Parganas. Range: ${product.range}, Top Speed: ${product.topSpeed}. Available at Bondhu Motor and Electric with easy EMI. ${product.description}`,
    openGraph: {
      title: `${product.name} | Bondhu Motor`,
      description: `Buy ${product.name} in South 24 Parganas. Check specs, price and EMI options.`,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  // Generate Product JSON-LD
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `https://www.bondhumotorelectric.com${product.image}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.bondhumotorelectric.com/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Bondhu Motor and Electric"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-blue transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all scooters
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Col: Image & Quick Info */}
          <div className="flex flex-col gap-6">
            <div className="w-full aspect-square rounded-[2.5rem] bg-gradient-to-br from-[#141C2F] to-[#0A0E1A] border border-white/5 relative overflow-hidden flex items-center justify-center p-12 group">
              <div className="absolute inset-0 bg-brand-blue/5 group-hover:bg-brand-blue/10 transition-colors duration-500" />
              <div className="relative text-center opacity-50 z-10 font-mono text-sm border-2 border-dashed border-text-muted/30 p-12 rounded-2xl w-full h-full flex items-center justify-center">
                Image for: {product.name}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 border-brand-blue/20">
                <Zap className="w-6 h-6 text-brand-blue" />
                <span className="text-xs text-text-muted">Range</span>
                <span className="font-bold text-text-primary text-sm">{product.range}</span>
              </div>
              <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 border-brand-green/20">
                <Gauge className="w-6 h-6 text-brand-green" />
                <span className="text-xs text-text-muted">Top Speed</span>
                <span className="font-bold text-text-primary text-sm">{product.topSpeed}</span>
              </div>
              <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 border-white/10">
                <Battery className="w-6 h-6 text-text-primary" />
                <span className="text-xs text-text-muted">Charging</span>
                <span className="font-bold text-text-primary text-sm">{product.chargingTime}</span>
              </div>
            </div>
          </div>
          
          {/* Right Col: Details & Buy/EMI */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-wider uppercase text-text-body mb-4 inline-block">
                {product.brand}
              </span>
              <h1 className="text-4xl md:text-5xl font-black font-heading mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-text-muted leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div className="mb-10">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold font-mono text-text-primary">
                  {product.priceFormatted}
                </span>
              </div>
              <div className="mt-2 text-sm text-text-muted flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green" /> Ex-showroom price
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a 
                href={`https://wa.me/916297944059?text=${encodeURIComponent(`Hi, I am interested in ${product.name}. Please share price and availability at Bondhu Motor, Jumainaskar Hat.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#1EBE61] hover:scale-105 transition-all text-center shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                Inquire on WhatsApp
              </a>
              <Link 
                href="/contact"
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-center flex-1"
              >
                Book Test Ride
              </Link>
            </div>
            
            {/* EMI Section */}
            <EMICalculator price={product.price} />
            
            <div className="mt-16">
               <SpecsTable product={product} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
