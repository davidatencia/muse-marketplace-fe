import { useState } from 'react';
import type { CSSProperties } from 'react';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import ImageLightbox from '@public/storefront/components/catalog/ImageLightbox/ImageLightbox';
import { useCart } from '@public/storefront/context/CartProvider/useCart';
import { formatCurrency } from '@shared/utils/formatCurrency';
import type { Accessory } from '@shared/types/accessory';
import styles from './ProductCard.module.css';

const LOW_STOCK_THRESHOLD = 5;

const ACCENTS = [
  'var(--color-amethyst)',
  'var(--color-olive)',
  'var(--color-dark-purple)',
  'var(--color-cal-poly-green)',
];

function accentFor(category: string) {
  let hash = 0;
  for (const char of category) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return ACCENTS[hash % ACCENTS.length];
}

interface ProductCardProps {
  product: Accessory;
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem, getQuantity, openCart } = useCart();
  const quantityInCart = getQuantity(product.id);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const hasImage = Boolean(product.img);
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
      <div className={styles.media} data-featured={product.highlighted}>
        <div className={styles.frame}>
          <span className={styles.categoryTab}>{product.category}</span>

          {product.highlighted && (
            <span className={styles.featured}>
              <span aria-hidden="true">★</span>{' '}
              <span className={styles.featuredLabel}>Destacado</span>
            </span>
          )}

          {hasImage ? (
            <button
              type="button"
              className={`${styles.imageWrap} ${styles.zoomTrigger}`}
              aria-label={`Ver ${product.name} de cerca`}
              onClick={() => setIsLightboxOpen(true)}
            >
              <ImagePlaceholder label={product.name} src={product.img} />
              <span className={styles.zoomHint} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m20 20-4-4M11 8v6M8 11h6" />
                </svg>
              </span>
            </button>
          ) : (
            <div className={styles.imageWrap}>
              <ImagePlaceholder label={product.name} src={product.img} />
            </div>
          )}

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
        </div>

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
            {formatCurrency(product.price)}
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

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.addToCart}
            disabled={isSoldOut || quantityInCart >= product.stock}
            onClick={() => addItem(product)}
          >
            {isSoldOut
              ? 'Agotado'
              : quantityInCart > 0
                ? `Agregar otro (${quantityInCart})`
                : 'Agregar al carrito'}
          </button>
          {quantityInCart > 0 && (
            <button
              type="button"
              className={styles.viewCart}
              onClick={openCart}
            >
              Ver carrito
            </button>
          )}
        </div>
      </div>
      {isLightboxOpen && (
        <ImageLightbox
          src={product.img}
          alt={product.name}
          title={product.name}
          subtitle={`${product.category} · ${formatCurrency(product.price)}`}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </article>
  );
}

export default ProductCard;
