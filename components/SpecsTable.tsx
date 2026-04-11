import type { Product } from "@/data/products";

export function SpecsTable({ product }: { product: Product }) {
  const specs = [
    { label: "Top Speed", value: product.topSpeed },
    { label: "Certified Range", value: product.range },
    { label: "Charging Time", value: product.chargingTime },
    { label: "Battery Capacity", value: product.batteryCapacity },
    { label: "Motor Type", value: product.motorType },
  ];

  return (
    <div className="glass-card rounded-3xl overflow-hidden bg-white/5">
      <div className="p-6 md:p-8 bg-brand-blue/5 border-b border-white/10">
        <h3 className="font-heading font-bold text-xl text-text-primary">Technical Specifications</h3>
        <p className="text-sm text-text-muted mt-1">Detailed performance metrics for {product.name}</p>
      </div>
      
      <div className="grid grid-cols-1 divide-y divide-white/5">
        {specs.map((spec, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-medium text-text-muted group-hover:text-text-primary transition-colors">
              {spec.label}
            </span>
            <span className="font-mono font-semibold text-text-primary mt-1 sm:mt-0 text-base sm:text-right">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
      
      <div className="p-6 md:p-8 bg-black/40 border-t border-white/10">
        <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Key Features</h4>
        <div className="flex flex-wrap gap-2">
          {product.features.map((feature, idx) => (
            <span 
              key={idx} 
              className="px-4 py-2 rounded-full text-xs font-medium bg-brand-green/10 text-brand-green border border-brand-green/20"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
