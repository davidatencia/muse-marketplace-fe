export interface Accessory {
  id: string;
  name: string;
  description: string;
  img: string;
  handmade: boolean;
  highlighted: boolean;
  price: number;
  stock: number;
  rating: number | null;
  category: string;
  materials: string[];
}

export interface AccessoryPayload {
  name: string;
  description: string;
  img: string;
  category_id: number;
  handmade: boolean;
  available: boolean;
  highlighted: boolean;
  price: number;
  stock: number;
  rating: number | null;
  materials: number[];
}
