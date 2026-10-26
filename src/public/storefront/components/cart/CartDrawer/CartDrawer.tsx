import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import { env } from '@shared/config/env';
import { useBodyScrollLock } from '@shared/hooks/useBodyScrollLock';
import { formatCurrency } from '@shared/utils/formatCurrency';
import { useCart } from '@public/storefront/context/CartProvider/useCart';
import {
  buildCartMessage,
  buildWhatsAppUrl,
} from '@public/storefront/utils/whatsapp';
import styles from './CartDrawer.module.css';

function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Keep the native <dialog> in sync with context state. showModal() gives us
  // focus trapping, Esc to close and inert background for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useBodyScrollLock(isOpen);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeCart();
  }

  const whatsappUrl = env.whatsappNumber
    ? buildWhatsAppUrl(env.whatsappNumber, buildCartMessage(items, totalPrice))
    : null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.drawer}
      aria-labelledby="cart-title"
      onClose={closeCart}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h2 id="cart-title" className={styles.title}>
            Tu carrito
            {totalItems > 0 && (
              <span className={styles.count}>{totalItems}</span>
            )}
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Cerrar carrito"
            onClick={closeCart}
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Todavía no has agregado productos.</p>
            <Link to="/productos" className={styles.browse} onClick={closeCart}>
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.thumb}>
                    <ImagePlaceholder label={item.name} src={item.img} />
                  </div>

                  <div className={styles.info}>
                    <p className={styles.category}>{item.category}</p>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.unitPrice}>
                      {formatCurrency(item.price)}
                    </p>

                    <div className={styles.controls}>
                      <div
                        className={styles.stepper}
                        role="group"
                        aria-label={`Cantidad de ${item.name}`}
                      >
                        <button
                          type="button"
                          aria-label="Disminuir cantidad"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Aumentar cantidad"
                          disabled={item.quantity >= item.stock}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => removeItem(item.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>

                  <p className={styles.subtotal}>
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <footer className={styles.footer}>
              <div className={styles.total}>
                <span>Total estimado</span>
                <strong>{formatCurrency(totalPrice)}</strong>
              </div>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsapp}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.3 11.3 0 0 0 12.05.71C5.79.71.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.01-1.58a11.3 11.3 0 0 0 5.43 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.02"
                    />
                  </svg>
                  Enviar pedido por WhatsApp
                </a>
              ) : (
                <p className={styles.notice}>
                  El envío por WhatsApp no está disponible en este momento.
                </p>
              )}

              <p className={styles.hint}>
                Se abrirá WhatsApp con tu pedido listo para enviar.
              </p>

              <button
                type="button"
                className={styles.clear}
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}

export default CartDrawer;
