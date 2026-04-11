"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Reviews() {
  const reviews = [
    {
      id: 1,
      date: "2 days ago",
      text: "The best electric scooty in jumainaskar hat without a doubt. I bought the Tarmac Alpha Pro and the range is exactly as promised. Showroom owners are very transparent and helped with the EMI process smoothly.",
      stars: 5,
    },
    {
      id: 2,
      date: "1 week ago",
      text: "I was searching for 'best electric scooty near me' and found Bondhu Motor in Jumainaskar. The Tarmac Scooty quality is super premium. Excellent delivery experience.",
      stars: 5,
    },
    {
      id: 3,
      date: "2 weeks ago",
      text: "Highly recommended EV showroom in South 24 Parganas. Very fast delivery and they open till 8 PM which was perfect for me after work. The styling is just amazing.",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute left-[-10%] top-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-[-10%] bottom-0 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-text-primary">
            Our Happy <span className="text-brand-green">Customers</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Discover why riders across Jumainaskar, Dholahat, and South 24 Parganas rate us as the best EV dealership in the district.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col"
            >
              {/* Massive Customer + Scooter Photo Block */}
              <div className="w-full aspect-square relative bg-card-border/50 flex items-center justify-center overflow-hidden border-b border-card-border">
                <Image 
                  src={`/review${review.id}.jpeg`} 
                  alt={`Customer taking delivery of Tarmac scooter`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Review Content */}
              <div className="p-8 flex flex-col flex-1 bg-card-bg/40">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-text-muted font-medium">{review.date}</p>
                  </div>
                  <div className="flex gap-1 bg-background/50 px-3 py-1.5 rounded-full border border-card-border backdrop-blur-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < review.stars ? "text-[#00B4FF] fill-[#00B4FF]" : "text-card-border"}`} 
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
