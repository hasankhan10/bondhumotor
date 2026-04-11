"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do I need a license and registration for an electric scooter?",
    a: "It depends on the model. High-speed scooters (top speed > 25 kmph) require a valid driver's license and RTO registration. Low-speed models do not require them. Our team at Bondhu Motor will guide you through the process for your chosen model.",
  },
  {
    q: "What is the battery warranty on your scooters?",
    a: "Most premium brands like Ola, Ather, and TVS offer an extensive battery warranty, typically covering 3 to 5 years or up to 40,000 to 60,000 km, whichever comes first.",
  },
  {
    q: "Is EMI available for purchasing an EV?",
    a: "Yes! We offer easy and flexible EMI options through multiple finance partners. You can secure a loan with a minimal down payment. Use our EMI calculator to check approximate monthly payments.",
  },
  {
    q: "Where can I charge my electric scooter?",
    a: "You can easily charge your scooter at home using a standard 15 AMP socket with the provided portable charger. Additionally, brands like Ather and Ola have growing public fast-charging networks across West Bengal.",
  },
  {
    q: "Are EVs eligible for government subsidies in West Bengal?",
    a: "Yes, there are benefits under the FAME II scheme and specific state EV policies which reduce the effective on-road price. Our staff assists with all subsidy-related document submissions.",
  },
  {
    q: "Can I take a test ride before buying?",
    a: "Absolutely. We encourage all customers to book a free test ride at our Jumainaskar Hat showroom to experience the performance and comfort firsthand.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={idx}
            initial={false}
            className={cn(
              "glass-card rounded-2xl overflow-hidden transition-colors duration-300",
              isOpen ? "border-brand-blue/50 bg-[#141C2F]" : "border-white/10 hover:border-white/30"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left"
            >
              <span className="font-heading font-semibold text-text-primary/90 text-sm md:text-base pr-4">
                {faq.q}
              </span>
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isOpen ? "bg-brand-blue text-white" : "bg-card-bg text-text-muted hover:bg-card-bg/80"
                )}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 md:px-6 pb-6 text-sm text-text-muted leading-relaxed">
                    <div className="h-[1px] w-full bg-white/5 mb-4" />
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
