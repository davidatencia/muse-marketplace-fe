import type { CSSProperties } from 'react';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import type { Accessory } from '@shared/types/accessory';
import styles from './ProductCard.module.css';

const LOW_STOCK_THRESHOLD = 5;

const ACCENTS = [
  'var(--color-amethyst)',
  'var(--color-olive)',
  'var(--color-dark-purple)',
  'var(--color-cal-poly-green)',
];

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

function accentFor(category: string) {
  let hash = 0;
  for (const char of category) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return ACCENTS[hash % ACCENTS.length];
}

interface ProductCardProps {
  product: Accessory;
  showAddToCart?: boolean;
  onAddToCart?: (product: Accessory) => void;
}

function ProductCard({
  product,
  showAddToCart = false,
  onAddToCart,
}: ProductCardProps) {
  const isSoldOut = product.stock <= 0;
  const isLowStock = !isSoldOut && product.stock <= LOW_STOCK_THRESHOLD;
  const style = { '--accent': accentFor(product.category) } as CSSProperties;

  return (
    <article
      className={styles.card}
      style={style}
      data-sold-out={isSoldOut}
      tabIndex={0}
    >
      <div className={styles.media}>
        <span className={styles.categoryTab}>{product.category}</span>

        {product.highlighted && (
          <span className={styles.featured}>
            <span aria-hidden="true">★</span> Destacado
          </span>
        )}

        <div className={styles.imageWrap}>
          <ImagePlaceholder label={product.name} src={product.img} />
        </div>

        {isSoldOut ? (
          <span className={`${styles.stockBadge} ${styles.soldOut}`}>
            Agotado
          </span>
        ) : (
          isLowStock && (
            <span className={styles.stockBadge}>
              {product.stock === 1
                ? '¡Última unidad!'
                : `¡Últimas ${product.stock} unidades!`}
            </span>
          )
        )}

        {/* Revealed over the image on hover/focus; shown inline on touch. */}
        <div className={styles.details}>
          {product.description && (
            <p className={styles.description}>{product.description}</p>
          )}
          {product.materials.length > 0 && (
            <ul className={styles.tags} aria-label="Materiales">
              {product.materials.map((material) => (
                <li key={material} className={styles.tag}>
                  {material}
                </li>
              ))}
            </ul>
          )}
          {!isSoldOut && (
            <p className={styles.availability}>
              {product.stock}{' '}
              {product.stock === 1 ? 'disponible' : 'disponibles'}
            </p>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.meta}>
          <span className={styles.price}>
            {currencyFormatter.format(product.price)}
          </span>
          {product.rating !== null && (
            <p
              className={styles.rating}
              aria-label={`Calificación ${product.rating} de 5`}
            >
              <span className={styles.stars} aria-hidden="true">
                {'★'.repeat(Math.round(product.rating))}
                <span className={styles.starsEmpty}>
                  {'★'.repeat(5 - Math.round(product.rating))}
                </span>
              </span>
              <span aria-hidden="true">{product.rating.toFixed(1)}</span>
            </p>
          )}
        </div>

        {product.handmade && (
          <ul className={styles.tags} aria-label="Características">
            <li className={`${styles.tag} ${styles.handmade}`}>Hecho a mano</li>
          </ul>
        )}

        {showAddToCart && (
          <button
            type="button"
            className={styles.addToCart}
            disabled={isSoldOut}
            onClick={() => onAddToCart?.(product)}
          >
            {isSoldOut ? 'Agotado' : 'Agregar al carrito'}
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
