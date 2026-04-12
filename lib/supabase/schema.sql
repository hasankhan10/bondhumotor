-- =============================================
-- BONDHU MOTOR - SUPABASE DATABASE SCHEMA
-- Run this SQL in: Supabase Dashboard → SQL Editor
-- =============================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL DEFAULT 'TARMAC',
  model TEXT NOT NULL,
  name TEXT NOT NULL,
  market_price INTEGER NOT NULL,
  showroom_price INTEGER NOT NULL,
  range TEXT NOT NULL,
  top_speed TEXT NOT NULL,
  charging_time TEXT NOT NULL,
  battery_capacity TEXT NOT NULL,
  motor_type TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '/images/products/placeholder.webp',
  features TEXT[] NOT NULL DEFAULT '{}',
  stock_status TEXT NOT NULL DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'coming_soon')),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  stars INTEGER NOT NULL DEFAULT 5 CHECK (stars >= 1 AND stars <= 5),
  date_label TEXT NOT NULL DEFAULT 'Recently',
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. STORE SETTINGS TABLE (key-value pairs)
CREATE TABLE IF NOT EXISTS store_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT 'Bondhu Motor Showroom',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ: Anyone can view published data
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can read reviews" ON reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read store_settings" ON store_settings FOR SELECT USING (true);
CREATE POLICY "Public can read gallery_images" ON gallery_images FOR SELECT USING (is_visible = true);

-- ADMIN WRITE: Only authenticated users can modify data
CREATE POLICY "Authenticated users can insert products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update products" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete products" ON products FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert reviews" ON reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update reviews" ON reviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete reviews" ON reviews FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert store_settings" ON store_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update store_settings" ON store_settings FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert gallery_images" ON gallery_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update gallery_images" ON gallery_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete gallery_images" ON gallery_images FOR DELETE TO authenticated USING (true);

-- =============================================
-- DEFAULT STORE SETTINGS (minimal config only)
-- =============================================
INSERT INTO store_settings (key, value, label) VALUES
  ('phone', '+91 6297 944 059', 'Primary Phone Number'),
  ('whatsapp', '916297944059', 'WhatsApp Number (without +)'),
  ('emi_interest_rate', '9.5', 'EMI Interest Rate (%)'),
  ('emi_min_downpayment', '10', 'Minimum Downpayment (%)'),
  ('owner_name', 'Miraz Laskar', 'Owner Name')
ON CONFLICT (key) DO NOTHING;
