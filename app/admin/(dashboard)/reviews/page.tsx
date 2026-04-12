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
  Eye,
  EyeOff,
  Star,
} from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";



interface Review {
  id: string;
  text: string;
  stars: number;
  date_label: string;
  image_url: string;
  display_order: number;
  is_visible: boolean;
}

export default function AdminReviewsPage() {
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("display_order", { ascending: true });
    setReviews(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  function openNew() {
    setEditing({
      id: "",
      text: "",
      stars: 5,
      date_label: "Recently",
      image_url: "",
      display_order: reviews.length + 1,
      is_visible: true,
    });
    setIsNew(true);
  }

  function openEdit(review: Review) {
    setEditing({ ...review });
    setIsNew(false);
  }

  function closeEditor() {
    setEditing(null);
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);

    const payload = {
      text: editing.text,
      stars: editing.stars,
      date_label: editing.date_label,
      image_url: editing.image_url,
      display_order: editing.display_order,
      is_visible: editing.is_visible,
    };

    if (isNew) {
      await supabase.from("reviews").insert(payload);
    } else {
      await supabase.from("reviews").update(payload).eq("id", editing.id);
    }

    setSaving(false);
    closeEditor();
    fetchReviews();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this review?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    fetchReviews();
  }

  async function toggleVisibility(review: Review) {
    await supabase
      .from("reviews")
      .update({ is_visible: !review.is_visible })
      .eq("id", review.id);
    fetchReviews();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-heading text-white">
            Reviews
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage customer testimonials & delivery photos
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-3 bg-brand-blue text-white font-bold text-sm rounded-xl hover:bg-brand-blue/80 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Review
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 bg-white/5 rounded-[2.5rem] border border-white/5">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-blue/20 blur-2xl rounded-full animate-pulse" />
            <Loader2 className="w-8 h-8 text-brand-blue animate-spin relative z-10" />
          </div>
          <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px] animate-pulse">
            Syncing Reviews...
          </p>
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white/5 border rounded-2xl p-6 space-y-4 transition-all ${
                review.is_visible
                  ? "border-white/5"
                  : "border-red-500/20 opacity-50"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.stars
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 italic">
                &quot;{review.text}&quot;
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs text-gray-500">
                  {review.date_label}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleVisibility(review)}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title={review.is_visible ? "Hide" : "Show"}
                  >
                    {review.is_visible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => openEdit(review)}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0D1117] rounded-3xl border border-white/10 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Add Review" : "Edit Review"}
              </h2>
              <button
                onClick={closeEditor}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Review Text
              </label>
              <textarea
                value={editing.text}
                onChange={(e) =>
                  setEditing({ ...editing, text: e.target.value })
                }
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Stars (1-5)
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={editing.stars}
                  onChange={(e) =>
                    setEditing({ ...editing, stars: Number(e.target.value) })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Date Label
                </label>
                <input
                  type="text"
                  value={editing.date_label}
                  onChange={(e) =>
                    setEditing({ ...editing, date_label: e.target.value })
                  }
                  placeholder="e.g. 2 days ago"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4">
              <ImageUpload
                value={editing.image_url}
                onChange={(url) => setEditing({ ...editing, image_url: url })}
                bucket="reviews"
                label="Delivery Photo (Optional)"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.is_visible}
                onChange={(e) =>
                  setEditing({ ...editing, is_visible: e.target.checked })
                }
                className="w-5 h-5 rounded accent-brand-blue"
              />
              <span className="text-sm text-gray-300 font-medium">
                Visible on Website
              </span>
            </label>

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
              {isNew ? "Add Review" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
