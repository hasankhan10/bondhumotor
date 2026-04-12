"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";


interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_visible: boolean;
}

export default function AdminGalleryPage() {
  const supabase = createClient();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true });
    setImages(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  async function handleAdd() {
    if (!newUrl) return;
    setSaving(true);
    await supabase.from("gallery_images").insert({
      image_url: newUrl,
      alt_text: newAlt || "Bondhu Motor Showroom",
      display_order: images.length + 1,
    });
    setNewUrl("");
    setNewAlt("");
    setShowAdd(false);
    setSaving(false);
    fetchImages();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this gallery image?")) return;
    await supabase.from("gallery_images").delete().eq("id", id);
    fetchImages();
  }

  async function toggleVisibility(image: GalleryImage) {
    await supabase
      .from("gallery_images")
      .update({ is_visible: !image.is_visible })
      .eq("id", image.id);
    fetchImages();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-heading text-white">
            Gallery
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage your showroom gallery photos
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-5 py-3 bg-brand-blue text-white font-bold text-sm rounded-xl hover:bg-brand-blue/80 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Photo
        </button>
      </div>

      {/* Add New Form */}
      {showAdd && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-bold">Add New Gallery Photo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <ImageUpload
                value={newUrl}
                onChange={(url) => setNewUrl(url)}
                bucket="gallery"
                label="Gallery Photo"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">
                Alt Text
              </label>
              <input
                value={newAlt}
                onChange={(e) => setNewAlt(e.target.value)}
                placeholder="Bondhu Motor Showroom"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-6 py-3 bg-brand-green text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Adding..." : "Add Photo"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-6 py-3 bg-white/5 text-gray-300 font-medium text-sm rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-3" />
          Loading gallery...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={`relative group rounded-2xl overflow-hidden border transition-all ${
                image.is_visible
                  ? "border-white/5"
                  : "border-red-500/20 opacity-50"
              }`}
            >
              <div className="aspect-square bg-white/5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={() => toggleVisibility(image)}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title={image.is_visible ? "Hide" : "Show"}
                >
                  {image.is_visible ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="p-3 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Order Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 text-white text-xs font-mono">
                <GripVertical className="w-3 h-3" />
                {image.display_order}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
