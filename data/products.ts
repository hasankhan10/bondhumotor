export interface Product {
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


export const products: Product[] = [];

