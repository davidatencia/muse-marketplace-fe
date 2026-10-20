import type { CartItem } from '@public/storefront/context/CartProvider/CartContext';
import { formatCurrency } from '@shared/utils/formatCurrency';

export function buildCartMessage(items: CartItem[], totalPrice: number) {
  const lines = items.map(
    (item) =>
      `• ${item.name} (${item.category}) x${item.quantity} — ${formatCurrency(
        item.price * item.quantity,
      )}`,
  );

  return [
    '¡Hola Musé! Me interesan estos productos:',
    '',
    ...lines,
    '',
    `Total estimado: ${formatCurrency(totalPrice)}`,
    '',
    '¿Me confirmas disponibilidad y cómo hacer el pedido?',
  ].join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
