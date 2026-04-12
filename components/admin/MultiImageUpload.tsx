"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/supabase/storage";

interface MultiImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  bucket: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  bucket,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      const newUrls: string[] = [...value];

      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i], bucket);
        newUrls.push(url);
      }

      onChange(newUrls);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload some images.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange(newUrls);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div
            key={url + index}
            className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-white/5 shadow-lg"
          >
            <img
              src={url}
              alt={`Gallery ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {index === 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-brand-blue/90 text-[8px] text-white font-black uppercase tracking-widest text-center py-1">
                Main Image
              </div>
            )}
          </div>
        ))}

        <label className="aspect-square border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 hover:border-brand-blue/50 transition-all group">
          {uploading ? (
            <Loader2 className="w-6 h-6 text-brand-blue animate-spin" />
          ) : (
            <>
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-brand-blue/10 transition-colors">
                <Upload className="w-5 h-5 text-gray-400 group-hover:text-brand-blue" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-brand-blue transition-colors">
                Add More
              </span>
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}
