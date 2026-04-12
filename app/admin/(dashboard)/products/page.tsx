"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
  Clock,
  BadgePercent,
  Package,
  PackageCheck,
  PackageX,
} from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MultiImageUpload } from "@/components/admin/MultiImageUpload";




interface Product {
  id: string;
  slug: string;
  brand: string;
  model: string;
  name: string;
  market_price: number;
  showroom_price: number;
  range: string;
  top_speed: string;
  charging_time: string;
  battery_capacity: string;
  motor_type: string;
  description: string;
  image: string;
  images: string[];
  features: string[];
  stock_status: string;
  display_order: number;
  is_featured: boolean;
}


const emptyProduct: Omit<Product, "id"> = {
  slug: "",
  brand: "TARMAC",
  model: "",
  name: "",
  market_price: 0,
  showroom_price: 0,
  range: "",
  top_speed: "",
  charging_time: "",
  battery_capacity: "",
  motor_type: "",
  description: "",
  image: "/images/products/placeholder.webp",
  images: [],
  features: [],
  stock_status: "in_stock",
  display_order: 0,
  is_featured: false,
};


function formatINR(num: number): string {
  if (!num) return "₹0";
  return "₹" + num.toLocaleString("en-IN");
}

function calcDiscount(market: number, showroom: number): number {
  if (!market || market <= showroom) return 0;
  return Math.round(((market - showroom) / market) * 100);
}

export default function AdminProductsPage() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featuresText, setFeaturesText] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("display_order", { ascending: true });
    setProducts(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function openNew() {
    setEditingProduct({ id: "", ...emptyProduct });
    setFeaturesText("");
    setIsNew(true);
  }

  function openEdit(product: Product) {
    setEditingProduct({ ...product });
    setFeaturesText(product.features.join(", "));
    setIsNew(false);
  }

  function closeEditor() {
    setEditingProduct(null);
    setIsNew(false);
  }

  function handleChange(
    field: keyof Product,
    value: string | number | boolean | string[]
  ) {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, [field]: value });
  }

  async function handleSave() {
    if (!editingProduct) return;
    setSaving(true);

    const payload = {
      slug:
        editingProduct.slug ||
        editingProduct.name.toLowerCase().replace(/\s+/g, "-"),
      brand: editingProduct.brand,
      model: editingProduct.model,
      name: editingProduct.name,
      market_price: Number(editingProduct.market_price),
      showroom_price: Number(editingProduct.showroom_price),
      range: editingProduct.range,
      top_speed: editingProduct.top_speed,
      charging_time: editingProduct.charging_time,
      battery_capacity: editingProduct.battery_capacity,
      motor_type: editingProduct.motor_type,
      description: editingProduct.description,
      image: editingProduct.image,
      images: editingProduct.images || [],
      features: featuresText
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      stock_status: editingProduct.stock_status,
      display_order: Number(editingProduct.display_order),
      is_featured: editingProduct.is_featured,
    };


    if (isNew) {
      await supabase.from("products").insert(payload);
    } else {
      await supabase
        .from("products")
        .update(payload)
        .eq("id", editingProduct.id);
    }

    setSaving(false);
    closeEditor();
    fetchProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  const stockBadge = (status: string) => {
    const map: Record<
      string,
      { label: string; color: string; icon: React.ElementType }
    > = {
      in_stock: {
        label: "In Stock",
        color: "text-green-400 bg-green-500/10 border-green-500/20",
        icon: PackageCheck,
      },
      out_of_stock: {
        label: "Out of Stock",
        color: "text-red-400 bg-red-500/10 border-red-500/20",
        icon: PackageX,
      },
      coming_soon: {
        label: "Coming Soon",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        icon: Clock,
      },
    };
    const item = map[status] || map.in_stock;
    const Icon = item.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${item.color}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {item.label}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-heading text-white">
            Products
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage your TARMAC scooter lineup
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-3 bg-brand-blue text-white font-bold text-sm rounded-xl hover:bg-brand-blue/80 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-3" />
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Products Yet</h3>
          <p className="text-gray-400 mb-6">Add your first TARMAC scooter to get started.</p>
          <button
            onClick={openNew}
            className="px-6 py-3 bg-brand-blue text-white font-bold text-sm rounded-xl hover:bg-brand-blue/80 transition-colors"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Add First Product
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                <th className="py-4 px-4">#</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">MRP</th>
                <th className="py-4 px-4">Our Price</th>
                <th className="py-4 px-4">Discount</th>
                <th className="py-4 px-4">Range</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const discount = calcDiscount(
                  product.market_price,
                  product.showroom_price
                );
                return (
                  <tr
                    key={product.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-500 text-sm">
                      {product.display_order}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {product.name}
                        </p>
                        <p className="text-gray-500 text-xs">{product.slug}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400 font-mono text-sm line-through">
                      {formatINR(product.market_price)}
                    </td>
                    <td className="py-4 px-4 text-brand-green font-mono font-bold text-sm">
                      {formatINR(product.showroom_price)}
                    </td>
                    <td className="py-4 px-4">
                      {discount > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                          <BadgePercent className="w-3 h-3" />
                          {discount}% OFF
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-300 text-sm">
                      {product.range}
                    </td>
                    <td className="py-4 px-4">
                      {stockBadge(product.stock_status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0D1117] rounded-[2.5rem] border border-white/10 p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#0D1117] z-10 pb-4 border-b border-white/5">



              <h2 className="text-xl font-bold text-white">
                {isNew ? "Add New Product" : "Edit Product"}
              </h2>
              <button
                onClick={closeEditor}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Name"
                value={editingProduct.name}
                onChange={(v) => handleChange("name", v)}
                colSpan={2}
              />
              <Field
                label="Slug"
                value={editingProduct.slug}
                onChange={(v) => handleChange("slug", v)}
                placeholder="auto-generated-if-empty"
              />
              <Field
                label="Brand"
                value={editingProduct.brand}
                onChange={(v) => handleChange("brand", v)}
              />
              <Field
                label="Model"
                value={editingProduct.model}
                onChange={(v) => handleChange("model", v)}
              />
              <Field
                label="Display Order"
                value={String(editingProduct.display_order)}
                onChange={(v) => handleChange("display_order", Number(v))}
                type="number"
              />
            </div>

            {/* Pricing Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BadgePercent className="w-4 h-4 text-brand-green" />
                Pricing & Discount
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Market Price / MRP (₹)"
                  value={String(editingProduct.market_price)}
                  onChange={(v) => handleChange("market_price", Number(v))}
                  type="number"
                />
                <Field
                  label="Showroom Price (₹)"
                  value={String(editingProduct.showroom_price)}
                  onChange={(v) => handleChange("showroom_price", Number(v))}
                  type="number"
                />
              </div>
              {/* Live Discount Preview */}
              {editingProduct.market_price > 0 &&
                editingProduct.showroom_price > 0 && (
                  <div className="flex items-center gap-4 p-3 bg-brand-green/5 border border-brand-green/10 rounded-xl">
                    <div className="text-sm text-gray-400">
                      MRP:{" "}
                      <span className="line-through text-gray-500">
                        {formatINR(editingProduct.market_price)}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-brand-green">
                      Our Price: {formatINR(editingProduct.showroom_price)}
                    </div>
                    {calcDiscount(
                      editingProduct.market_price,
                      editingProduct.showroom_price
                    ) > 0 && (
                      <span className="ml-auto text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        {calcDiscount(
                          editingProduct.market_price,
                          editingProduct.showroom_price
                        )}
                        % OFF
                      </span>
                    )}
                  </div>
                )}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Range"
                value={editingProduct.range}
                onChange={(v) => handleChange("range", v)}
                placeholder="e.g. 195 km"
              />
              <Field
                label="Top Speed"
                value={editingProduct.top_speed}
                onChange={(v) => handleChange("top_speed", v)}
                placeholder="e.g. 120 kmph"
              />
              <Field
                label="Charging Time"
                value={editingProduct.charging_time}
                onChange={(v) => handleChange("charging_time", v)}
                placeholder="e.g. 6.5 hrs"
              />
              <Field
                label="Battery Capacity"
                value={editingProduct.battery_capacity}
                onChange={(v) => handleChange("battery_capacity", v)}
                placeholder="e.g. 4.0 kWh"
              />
              <Field
                label="Motor Type"
                value={editingProduct.motor_type}
                onChange={(v) => handleChange("motor_type", v)}
                placeholder="e.g. PMSM"
              />
              <div className="col-span-2 space-y-4">
                <ImageUpload
                  value={editingProduct.image}
                  onChange={(url) => handleChange("image", url)}
                  bucket="products"
                  label="Product Thumbnail (Used in Lists)"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Product Gallery (Additional Photos)</label>
                  <MultiImageUpload
                    value={editingProduct.images}
                    onChange={(urls) => handleChange("images", urls)}
                    bucket="products"
                  />
                </div>
              </div>
            </div>


            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue transition-colors resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Features (comma separated)
              </label>
              <input
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="Feature 1, Feature 2, Feature 3"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            {/* Stock Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Stock Status
              </label>
              <select
                value={editingProduct.stock_status}
                onChange={(e) => handleChange("stock_status", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue transition-colors"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>

            {/* Featured Toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editingProduct.is_featured}
                onChange={(e) => handleChange("is_featured", e.target.checked)}
                className="w-5 h-5 rounded accent-brand-blue"
              />
              <span className="text-sm text-gray-300 font-medium">
                Show on Homepage (Featured)
              </span>
            </label>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-4 bg-gradient-to-r from-brand-blue to-brand-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isNew ? "Create Product" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Field */
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  colSpan,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  colSpan?: number;
}) {
  return (
    <div className={colSpan === 2 ? "col-span-2" : ""}>
      <label className="text-xs font-medium text-gray-400 mb-1 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors"
      />
    </div>
  );
}
