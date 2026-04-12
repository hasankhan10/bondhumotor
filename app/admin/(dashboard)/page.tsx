import { createClient } from "@/lib/supabase/server";
import { Package, Star, Images, Settings } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [productsRes, reviewsRes, galleryRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact" }),
    supabase.from("reviews").select("id", { count: "exact" }),
    supabase.from("gallery_images").select("id", { count: "exact" }),
  ]);

  const stats = [
    {
      label: "Total Products",
      value: productsRes.count || 0,
      icon: Package,
      href: "/admin/products",
      color: "from-blue-500 to-cyan-400",
    },
    {
      label: "Customer Reviews",
      value: reviewsRes.count || 0,
      icon: Star,
      href: "/admin/reviews",
      color: "from-amber-500 to-yellow-400",
    },
    {
      label: "Gallery Photos",
      value: galleryRes.count || 0,
      icon: Images,
      href: "/admin/gallery",
      color: "from-emerald-500 to-green-400",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black font-heading text-white">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome back! Here&apos;s an overview of your showroom.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-4xl font-black text-white">
                {stat.value}
              </span>
            </div>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Add New Product", href: "/admin/products", icon: Package },
            { label: "Add Review", href: "/admin/reviews", icon: Star },
            { label: "Upload Gallery Photo", href: "/admin/gallery", icon: Images },
            { label: "Store Settings", href: "/admin/settings", icon: Settings },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 px-5 py-4 bg-white/5 border border-white/5 rounded-xl hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all text-sm font-medium text-gray-300 hover:text-white"
            >
              <action.icon className="w-5 h-5 text-brand-blue" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
