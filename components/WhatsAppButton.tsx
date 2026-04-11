"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton({ 
  productName = "" 
}: { 
  productName?: string 
}) {
  const phoneNumber = "916297944059"; // To be updated by client
  const defaultMsg = "Hello! I visited Bondhu Motor website and am interested in electric scooters.";
  const productMsg = `Hi, I am interested in ${productName}. Please share price and availability at Bondhu Motor, Jumainaskar Hat.`;
  
  const textMsg = encodeURIComponent(productName ? productMsg : defaultMsg);
  const waUrl = `https://wa.me/${phoneNumber}?text=${textMsg}`;

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute w-full h-full rounded-full border-2 border-[#25D366] opacity-0 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
      
      <MessageCircle className="w-7 h-7 relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-gray-900 border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none drop-shadow-xl font-medium">
        Chat with us
      </span>
    </motion.a>
  );
}
