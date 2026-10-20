import { useCart } from '@public/storefront/context/CartProvider/useCart';
import styles from './CartButton.module.css';

function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={`Abrir carrito (${totalItems} productos)`}
      onClick={openCart}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 7h12l-1 13H7L6 7Zm3 0V6a3 3 0 0 1 6 0v1"
        />
      </svg>
      {totalItems > 0 && (
        // Keyed by count so the bump animation replays on every change.
        <span key={totalItems} className={styles.badge}>
          {totalItems}
        </span>
      )}
    </button>
  );
}

export default CartButton;
