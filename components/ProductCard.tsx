"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Gauge } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  market_price: number;
  showroom_price: number;
  range: string;
  top_speed: string;
  image: string;
  is_featured: boolean;
}

function formatINR(num: number): string {
  return "₹" + num.toLocaleString("en-IN");
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const discount = Math.round(((product.market_price - product.showroom_price) / product.market_price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/0 to-brand-blue/0 group-hover:from-brand-blue/10 group-hover:to-brand-green/5 rounded-3xl transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100" />
      
      <div className="glass-card rounded-3xl p-6 relative z-10 flex flex-col h-full overflow-hidden border-white/5 hover:border-brand-blue/30 transition-colors duration-500 bg-[#141C2F]/80">
        
        {/* Top Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full bg-white/10 text-text-body border border-white/5">
            {product.brand}
          </span>
          {discount > 0 && (
            <span className="bg-red-500/10 text-red-500 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] mb-6 flex items-center justify-center">
          <div className="absolute inset-2 bg-gradient-to-t from-brand-blue/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform group-hover:translate-y-[-10px] transition-transform duration-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <h3 className="font-heading text-xl font-bold text-text-primary mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-green transition-all">
            {product.name}
          </h3>
          
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-text-primary">
                {formatINR(product.showroom_price)}
              </span>
              {discount > 0 && (
                <span className="text-sm font-mono text-text-muted line-through opacity-50">
                  {formatINR(product.market_price)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block mt-1">Ex-showroom price</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-text-body bg-white/5 rounded-xl p-2.5 border border-white/5">
              <Zap className="w-4 h-4 text-brand-blue" />
              <span>{product.range}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-text-body bg-white/5 rounded-xl p-2.5 border border-white/5">
              <Gauge className="w-4 h-4 text-brand-green" />
              <span>{product.top_speed}</span>
            </div>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 hover:bg-brand-blue/20 text-brand-blue font-black uppercase tracking-widest text-[10px] border border-brand-blue/30 transition-all duration-300 group/btn"
          >
            Explore Specs
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:text-text-primary transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
