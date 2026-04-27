import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { ArrowLeft, Battery, Gauge, Zap, CheckCircle2, BadgePercent, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SpecsTable } from "@/components/SpecsTable";
import { EMICalculator } from "@/components/EMICalculator";
import { ProductGallery } from "@/components/ProductGallery";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export const dynamic = "force-dynamic";



function formatINR(num: number): string {
  return "₹" + num.toLocaleString("en-IN");
}

function calcDiscount(market: number, showroom: number): number {
  if (!market || market <= showroom) return 0;
  return Math.round(((market - showroom) / market) * 100);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) return {};

  return {
    title: `${product.name} Price, Specs & Range | Bondhu Motor`,
    description: `Buy ${product.name} in South 24 Parganas. Range: ${product.range}, Top Speed: ${product.top_speed}. Available at Bondhu Motor and Electric with easy EMI. ${product.description}`,
    openGraph: {
      title: `${product.name} | Bondhu Motor`,
      description: `Buy ${product.name} in South 24 Parganas. Check specs, price and EMI options.`,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  
  if (!product) {
    notFound();
  }

  const discount = calcDiscount(product.market_price, product.showroom_price);

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "sku": `${product.brand}-${product.model}`.toUpperCase(),
    "mpn": product.id,
    "category": "Electric Scooter",
    "offers": {
      "@type": "Offer",
      "url": `https://bondhumotorandelectronic.netlify.app/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.showroom_price,
      "availability": product.stock_status === 'out_of_stock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Bondhu Motor and Electric"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Range",
        "value": product.range
      },
      {
        "@type": "PropertyValue",
        "name": "Top Speed",
        "value": product.top_speed
      },
      {
        "@type": "PropertyValue",
        "name": "Charging Time",
        "value": product.charging_time
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    }
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the range of ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${product.name} offers a range of ${product.range} on a full charge, making it ideal for daily commuting in South 24 Parganas.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the top speed of ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${product.name} can reach a top speed of ${product.top_speed}.`
        }
      },
      {
        "@type": "Question",
        "name": `Where can I buy ${product.name} in Dholahat?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can buy ${product.name} at Bondhu Motor and Electronic showroom located in Jumainaskar Hat, near Dholahat.`
        }
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "/" },
          { name: "Scooters", item: "/products" },
          { name: product.name, item: `/products/${product.slug}` },
        ]} 
      />
      <Script
        id={`product-jsonld-${product.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id={`product-faq-jsonld-${product.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
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
            <ProductGallery 
              images={productImages} 
              productName={product.name} 
              discount={discount} 
            />
            
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 border-brand-blue/20">
                <Zap className="w-7 h-7 text-brand-blue" />
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Range</span>
                <span className="font-bold text-text-primary text-sm">{product.range}</span>
              </div>
              <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 border-brand-green/20">
                <Gauge className="w-7 h-7 text-brand-green" />
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Speed</span>
                <span className="font-bold text-text-primary text-sm">{product.top_speed}</span>
              </div>
              <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 border-white/10">
                <Battery className="w-7 h-7 text-text-primary" />
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Charging</span>
                <span className="font-bold text-text-primary text-sm">{product.charging_time}</span>
              </div>
            </div>
          </div>
          
          {/* Right Col: Details & Buy/EMI */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-black tracking-widest uppercase border border-brand-blue/20">
                  {product.brand}
                </span>
                {product.is_featured && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black tracking-widest uppercase border border-amber-500/20">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-heading mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-text-muted leading-relaxed max-w-xl mb-6">
                {product.description}
              </p>

              {/* Modular Summary for AI & Quick Reading */}
              <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-4 mb-8">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-3">Modular Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold text-text-primary">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> 
                    <span>Range: {product.range}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> 
                    <span>Speed: {product.top_speed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> 
                    <span>Charging: {product.charging_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> 
                    <span>Brand: {product.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> 
                    <span>EMI: Available</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-10 p-6 rounded-3xl bg-white/5 border border-white/5 inline-block">
              <div className="text-xs text-text-muted uppercase tracking-widest font-bold mb-2">Showroom Price</div>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl md:text-6xl font-bold font-mono text-gradient">
                  {formatINR(product.showroom_price)}
                </span>
                {discount > 0 && (
                  <span className="text-xl md:text-2xl text-text-muted font-mono line-through opacity-50">
                    {formatINR(product.market_price)}
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-green">
                  <CheckCircle2 className="w-4 h-4" /> Best Price Guaranteed
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-brand-blue">
                  <ShieldCheck className="w-4 h-4" /> 3 Year Warranty
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a 
                href={`https://wa.me/916297944059?text=${encodeURIComponent(`Hi, I am interested in ${product.name}. Please share price and availability at Bondhu Motor, Jumainaskar Hat.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#1EBE61] hover:scale-105 transition-all text-center shadow-[0_20px_40px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3"
              >
                Inquire on WhatsApp
              </a>
              <Link 
                href="/contact"
                className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-center flex-1"
              >
                Book Test Ride
              </Link>
            </div>
            
            {/* EMI Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BadgePercent className="w-6 h-6 text-brand-green" />
                Easy EMI Options
              </h3>
              <EMICalculator price={product.showroom_price} />
            </div>
            
            <div className="mt-16">
               <SpecsTable product={product} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
