"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Filter, Search } from "lucide-react";

export function ProductsGrid() {
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  
  const brands = ["All", ...Array.from(new Set(products.map(p => p.brand)))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchBrand = activeBrand === "All" || p.brand === activeBrand;
      const matchPrice = p.price <= maxPrice;
      return matchBrand && matchPrice;
    });
  }, [activeBrand, maxPrice]);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="glass-card rounded-3xl p-6 mb-12 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        
        <div className="w-full md:w-1/2 flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-white/10 text-brand-blue font-semibold text-sm">
            <Filter className="w-4 h-4" /> Brands
          </div>
          <div className="flex gap-2">
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeBrand === brand 
                    ? "bg-brand-blue text-white shadow-glow-blue" 
                    : "bg-white/5 text-text-muted hover:bg-card-border/50 hover:text-text-primary"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-auto flex items-center gap-4 border-t md:border-t-0 md:border-l border-card-border pt-4 md:pt-0 pl-0 md:pl-8">
          <div className="flex flex-col gap-3 w-full md:w-64">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted font-medium whitespace-nowrap mr-2">Max Budget</span>
              <div className="relative w-full max-w-[130px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-mono text-sm">₹</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full bg-background border border-card-border rounded-lg pl-7 pr-3 py-1.5 text-sm font-mono font-bold text-brand-green outline-none focus:border-brand-green transition-colors"
                  placeholder="e.g. 100000"
                />
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={200000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-green h-1.5 bg-card-border rounded-full appearance-none outline-none cursor-pointer hover:accent-brand-blue transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((p, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={p.id}
              >
                <ProductCard product={p} index={0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-text-muted" />
          </div>
          <h3 className="text-xl font-bold font-heading mb-2">No Scooters Found</h3>
          <p className="text-text-muted">Try adjusting your filters to see more results.</p>
          <button 
            onClick={() => { setActiveBrand("All"); setMaxPrice(200000); }}
            className="mt-6 px-6 py-2 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors text-sm font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
