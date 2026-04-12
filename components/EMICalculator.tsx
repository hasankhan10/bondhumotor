"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";

export function EMICalculator({ price }: { price: number }) {
  const [downpayment, setDownpayment] = useState(Math.round(price * 0.2)); // 20% default

  // Standard EV finance interest rate is approx 9% flat ~ 15% reducing
  // We'll use a simplified flat interest rate of 8.5% for visual estimation
  const ANNUAL_INTEREST_RATE = 8.5;

  const calculateEMI = (months: number) => {
    const principal = price - downpayment;
    if (principal <= 0) return 0;
    
    // Simple flat rate calculation for estimation purposes
    const totalInterest = principal * (ANNUAL_INTEREST_RATE / 100) * (months / 12);
    const totalAmount = principal + totalInterest;
    return Math.round(totalAmount / months);
  };

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 bg-[#141C2F]/80 border-brand-blue/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/30">
          <Calculator className="w-5 h-5 text-brand-blue" />
        </div>
        <h3 className="font-heading font-bold text-xl">EMI Estimator</h3>
      </div>

      <div className="mb-8 group">
        <div className="flex justify-between items-end mb-4">
          <label className="text-sm font-medium text-text-muted cursor-pointer transition-colors group-hover:text-text-primary">
            Down Payment (₹)
          </label>
          <span className="text-brand-green font-mono font-bold text-lg bg-brand-green/10 px-3 py-1 rounded-lg">
            ₹{downpayment.toLocaleString()}
          </span>
        </div>
        
        <input
          type="range"
          min={0}
          max={price}
          step={5000}
          value={downpayment}
          onChange={(e) => setDownpayment(Number(e.target.value))}
          className="w-full accent-brand-blue h-1.5 bg-white/10 hover:bg-white/20 rounded-lg appearance-none cursor-pointer hover:accent-brand-green transition-all"
        />
        <div className="flex justify-between mt-2 text-xs text-text-muted font-mono">
          <span>₹0</span>
          <span>Max: ₹{price.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[12, 24, 36].map((months, i) => (
          <motion.div
            key={months}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all duration-300"
          >
            <span className="text-xs text-text-muted mb-2 uppercase tracking-wider font-semibold">
              {months} Months
            </span>
            <span className="font-mono text-xl font-bold text-text-primary mb-1">
              ₹{calculateEMI(months).toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted">/ month</span>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-xs text-text-muted/60 mt-6 mt-4">
        *This is an approximate calculation. Actual EMI may vary based on bank interest rates and processing fees.
      </p>
    </div>
  );
}
