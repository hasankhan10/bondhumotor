"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadImage } from "@/lib/supabase/storage";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket: string;
  label?: string;
}

export function ImageUpload({ value, onChange, bucket, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const url = await uploadImage(file, bucket);
      onChange(url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Make sure your Supabase bucket is set to 'Public'.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
      
      <div className="flex flex-col gap-4 max-w-sm">
        {value ? (
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
            <img src={value} alt="Preview" className="w-full h-full object-contain" />
            <button
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="w-full h-40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 hover:border-brand-blue/50 transition-all group">
            {uploading ? (
              <Loader2 className="w-6 h-6 text-brand-blue animate-spin" />
            ) : (
              <>
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-brand-blue/10 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-brand-blue" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-brand-blue transition-colors">Upload Photo</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        )}
      </div>

    </div>
  );
}
