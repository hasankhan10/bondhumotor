import type { Metadata } from "next";
import { ProductsGrid } from "@/components/ProductsGrid";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "All Electric Scooters | Bondhu Motor and Electric",
  description: "Browse our complete range of premium TARMAC electric scooters. Compare specifications, prices, and range.",
};

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center md:text-left mb-12">
        <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight mb-4 leading-tight">
          All <span className="text-gradient">Models</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl">
          Find the perfect electric vehicle that matches your lifestyle, commute requirements, and budget.
        </p>
      </div>

      <ProductsGrid initialProducts={products || []} />
    </div>
  );
}
