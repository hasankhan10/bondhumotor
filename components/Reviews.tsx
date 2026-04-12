"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  id: string;
  text: string;
  stars: number;
  date_label: string;
  image_url: string;
}

export function Reviews({ initialReviews }: { initialReviews: Review[] }) {
  if (initialReviews.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute left-[-10%] top-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-[-10%] bottom-0 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black font-heading mb-4 text-text-primary">
            Our Happy <span className="text-gradient">Customers</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Discover why riders across Jumainaskar, Dholahat, and South 24 Parganas rate us as the best EV dealership in the district.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {initialReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col"
            >
              {/* Photo Block */}
              <div className="w-full aspect-square relative bg-card-border/50 flex items-center justify-center overflow-hidden border-b border-card-border">
                {review.image_url ? (
                   <img 
                    src={review.image_url} 
                    alt={`Customer taking delivery of Tarmac scooter`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-text-muted/50 p-12 text-center">
                    <Star className="w-12 h-12 opacity-20" />
                    <span className="text-xs uppercase tracking-widest font-bold">Review Photo</span>
                  </div>
                )}
              </div>

              {/* Review Content */}
              <div className="p-8 flex flex-col flex-1 bg-card-bg/40">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-text-muted">{review.date_label}</p>
                  </div>
                  <div className="flex gap-1 bg-background/50 px-3 py-1.5 rounded-full border border-card-border backdrop-blur-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.stars ? "text-brand-blue fill-brand-blue" : "text-card-border"}`} 
                      />
                    ))}
                  </div>
                </div>

                <p className="text-text-body text-sm leading-relaxed italic opacity-90 mt-2 line-clamp-4">
                  "{review.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
