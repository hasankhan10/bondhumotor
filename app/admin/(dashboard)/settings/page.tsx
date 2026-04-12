"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string;
  label: string;
}

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("store_settings")
      .select("*")
      .order("label", { ascending: true });
    setSettings(data || []);
    // Initialize editedValues
    const values: Record<string, string> = {};
    (data || []).forEach((s) => (values[s.key] = s.value));
    setEditedValues(values);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  function handleChange(key: string, value: string) {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSaveAll() {
    setSaving(true);
    const promises = settings.map((s) =>
      supabase
        .from("store_settings")
        .update({ value: editedValues[s.key], updated_at: new Date().toISOString() })
        .eq("key", s.key)
    );
    await Promise.all(promises);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const settingDescriptions: Record<string, string> = {
    phone:
      "This number appears across the entire website — footer, contact page, and JSON-LD schema.",
    whatsapp:
      "Used for the WhatsApp chat button. Format: country code + number without + sign.",
    emi_interest_rate:
      "The annual interest rate used in the EMI Calculator on the homepage.",
    emi_min_downpayment:
      "Minimum downpayment percentage shown in the EMI calculator.",
    owner_name: "Displayed under the owner photo on the About Us page.",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-heading text-white">
            Store Settings
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Control phone numbers, EMI rates, and global configurations
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-green text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : saved ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saved ? "Saved!" : "Save All"}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 bg-white/5 rounded-[2.5rem] border border-white/5">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-blue/20 blur-2xl rounded-full animate-pulse" />
            <Loader2 className="w-8 h-8 text-brand-blue animate-spin relative z-10" />
          </div>
          <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px] animate-pulse">
            Syncing Store Settings...
          </p>
        </div>
      ) : (

        <div className="space-y-6">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-sm">
                    {setting.label}
                  </h3>
                  {settingDescriptions[setting.key] && (
                    <p className="text-gray-500 text-xs mt-1">
                      {settingDescriptions[setting.key]}
                    </p>
                  )}
                </div>
                <span className="text-xs font-mono text-gray-600 bg-white/5 px-2 py-1 rounded">
                  {setting.key}
                </span>
              </div>
              <input
                type="text"
                value={editedValues[setting.key] || ""}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-blue transition-colors font-mono"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
