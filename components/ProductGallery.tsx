"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discount: number;
}

export function ProductGallery({ images, productName, discount }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Main Image View */}
      <div className="w-full aspect-square rounded-[2.5rem] bg-card-bg border border-card-border relative overflow-hidden flex items-center justify-center p-8 group shadow-2xl">
        <div className="absolute inset-0 bg-brand-blue/5 group-hover:bg-brand-blue/10 transition-colors duration-500" />
        
        <img 
          src={images[activeImage]} 
          alt={productName} 
          className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-700 hover:scale-105"
        />
        
        {discount > 0 && (
          <div className="absolute top-6 left-6 z-20 bg-red-500 text-white px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest animate-pulse shadow-lg">
            {discount}% OFF
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 z-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 z-30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
          {images.map((url, i) => (
            <button
              key={url + i}
              onClick={() => setActiveImage(i)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                activeImage === i 
                  ? "border-brand-blue ring-4 ring-brand-blue/10 scale-95" 
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={url} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
