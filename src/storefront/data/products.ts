import type { Product } from '@storefront/types/content'

export const products: Product[] = [
  { id: 'aretes-luna', name: 'Aretes Luna', category: 'Aretes', price: 45000 },
  { id: 'aretes-gota-dorada', name: 'Aretes Gota Dorada', category: 'Aretes', price: 52000 },
  { id: 'aretes-minimal-hoop', name: 'Aretes Minimal Hoop', category: 'Aretes', price: 38000 },
  { id: 'collar-hilo-plata', name: 'Collar Hilo de Plata', category: 'Collares', price: 68000 },
  { id: 'collar-medalla-sol', name: 'Collar Medalla Sol', category: 'Collares', price: 74000 },
  { id: 'collar-capas', name: 'Collar Capas Doradas', category: 'Collares', price: 89000 },
  { id: 'pulsera-nudo', name: 'Pulsera Nudo Marinero', category: 'Pulseras', price: 32000 },
  { id: 'pulsera-dijes', name: 'Pulsera de Dijes', category: 'Pulseras', price: 41000 },
  { id: 'pulsera-cadena-fina', name: 'Pulsera Cadena Fina', category: 'Pulseras', price: 35000 },
  { id: 'anillo-ajustable', name: 'Anillo Ajustable Ola', category: 'Anillos', price: 28000 },
  { id: 'anillo-piedra-luna', name: 'Anillo Piedra Luna', category: 'Anillos', price: 47000 },
  { id: 'set-atardecer', name: 'Set Atardecer', category: 'Sets personalizados', price: 120000 },
  { id: 'set-jardin', name: 'Set Jardín Secreto', category: 'Sets personalizados', price: 135000 },
  { id: 'diadema-flores', name: 'Diadema Flores Secas', category: 'Accesorios para cabello', price: 39000 },
  { id: 'broche-perla', name: 'Broche Perla Artesanal', category: 'Accesorios para cabello', price: 26000 },
]

export const categories: string[] = Array.from(new Set(products.map((product) => product.category)))
