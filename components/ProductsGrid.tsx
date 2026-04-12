"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { Filter, Search } from "lucide-react";

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

export function ProductsGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  
  const brands = useMemo(() => {
    return ["All", ...Array.from(new Set(initialProducts.map(p => p.brand)))];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const matchBrand = activeBrand === "All" || p.brand === activeBrand;
      const matchPrice = p.showroom_price <= maxPrice;
      return matchBrand && matchPrice;
    });
  }, [activeBrand, maxPrice, initialProducts]);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="glass-card rounded-3xl p-6 mb-12 flex flex-col md:flex-row gap-8 justify-between items-stretch md:items-center border border-white/5">
        
        <div className="w-full md:w-1/2 flex flex-col items-start gap-3">
          <div className="flex items-center gap-2 text-brand-blue font-black tracking-widest uppercase text-[10px]">
            <Filter className="w-3.5 h-3.5" /> Filter by Brand
          </div>
          <div className="w-full flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-2">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeBrand === brand 
                      ? "bg-brand-blue text-white shadow-glow-blue border border-brand-blue/50" 
                      : "bg-white/5 text-text-muted hover:bg-white/10 hover:text-text-primary border border-white/5"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col items-start gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10">
          <div className="flex flex-col gap-4 w-full md:w-64">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Max Budget</span>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted font-mono text-[10px]">₹</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-28 bg-white/5 border border-white/10 rounded-lg pl-6 pr-2 py-1.5 text-[10px] font-mono font-bold text-brand-green outline-none focus:border-brand-green/50 transition-colors"
                  placeholder="100000"
                />
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={300000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-green h-1 bg-white/10 rounded-full appearance-none outline-none cursor-pointer hover:accent-brand-blue transition-all"
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
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5 text-gray-700">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading mb-2">No Scooters Found</h3>
          <p className="text-text-muted text-sm px-10">Try adjusting your filters or search for another budget.</p>
          <button 
            onClick={() => { setActiveBrand("All"); setMaxPrice(200000); }}
            className="mt-6 px-8 py-3 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue hover:bg-brand-blue hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-glow-blue/20"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
