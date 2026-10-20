import { createContext } from 'react';
import type { Accessory } from '@shared/types/accessory';

export interface CartItem {
  id: string;
  name: string;
  img: string;
  category: string;
  price: number;
  stock: number;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Accessory) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getQuantity: (id: string) => number;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);
