import type { Metadata } from "next";
import { ProductsGrid } from "@/components/ProductsGrid";

export const metadata: Metadata = {
  title: "All Electric Scooters | Bondhu Motor and Electric",
  description: "Browse our complete range of premium electric scooters from Ola, Ather, TVS, Bajaj, and more. Compare specifications, prices, and range.",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center md:text-left mb-12">
        <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tight mb-4">
          All <span className="text-brand-blue">Models</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl">
          Find the perfect electric vehicle that matches your lifestyle, commute requirements, and budget.
        </p>
      </div>

      <ProductsGrid />
    </div>
  );
}
