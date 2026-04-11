"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Gauge } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/0 to-brand-blue/0 group-hover:from-brand-blue/10 group-hover:to-brand-green/5 rounded-3xl transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100" />
      
      <div className="glass-card rounded-3xl p-6 relative z-10 flex flex-col h-full overflow-hidden border-white/5 hover:border-brand-blue/30 transition-colors duration-500 bg-[#141C2F]/80">
        
        {/* Top Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-text-body">
            {product.brand}
          </span>
          <span className="text-brand-green font-bold flex items-center gap-1">
            <Zap className="w-4 h-4" />
            EV
          </span>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] mb-6 flex items-center justify-center">
          {/* Subtle glow behind image */}
          <div className="absolute inset-2 bg-gradient-to-t from-brand-blue/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-card-border/50 rounded-xl flex items-center justify-center font-mono text-xs text-text-muted/50 border border-dashed border-card-border">
              Image: {product.slug}
            </div>
          </div>
          {/* Note: Update using <Image src={...} /> when pictures are available */}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <h3 className="font-heading text-xl font-bold text-text-primary mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-green transition-all">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-text-primary mb-4">
            {product.priceFormatted}
            <span className="text-sm font-normal text-text-muted block mt-1">Ex-showroom price</span>
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
            <div className="flex items-center gap-2 text-sm text-text-body bg-white/5 rounded-xl p-2.5 border border-white/5">
              <Zap className="w-4 h-4 text-brand-blue" />
              <span>{product.range}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-body bg-white/5 rounded-xl p-2.5 border border-white/5">
              <Gauge className="w-4 h-4 text-brand-green" />
              <span>{product.topSpeed}</span>
            </div>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/5 hover:bg-brand-blue/20 text-brand-blue font-semibold border border-brand-blue/30 transition-all duration-300 group/btn"
          >
            Explore Specs
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:text-text-primary transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
