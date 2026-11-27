import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import ProductCard from '@public/storefront/components/catalog/ProductCard/ProductCard';
import AnnouncementBar from '@public/storefront/components/catalog/AnnouncementBar/AnnouncementBar';
import SectionHeading from '@shared/components/ui/SectionHeading/SectionHeading';
import { useAccessories } from '@shared/api/accessoriesQueries';
import { usePromotions } from '@shared/api/promotionsQueries';
import { useRevealOnScroll } from '@shared/hooks/useRevealOnScroll';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import { getFirstActivePromotion } from '@shared/utils/promotions';
import styles from './Products.module.css';

const CATEGORY_PARAM = 'categoria';

function isSameCategory(a: string, b: string | null) {
  return b !== null && a.trim().toLowerCase() === b.trim().toLowerCase();
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get(CATEGORY_PARAM);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const {
    data: products = [],
    isPending: isLoading,
    error: loadError,
  } = useAccessories();
  const { data: promotions = [] } = usePromotions();
  const gridRef = useRevealOnScroll<HTMLUListElement>();
  const error = loadError
    ? getErrorMessage(loadError, 'No se pudo cargar el catálogo')
    : null;

  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  const visibleProducts = selectedCategory
    ? products.filter((product) =>
        isSameCategory(product.category, selectedCategory),
      )
    : products;

  const activePromotion = getFirstActivePromotion(promotions);

  function handleSelectCategory(category: string | null) {
    if (category) {
      setSearchParams({ [CATEGORY_PARAM]: category });
    } else {
      setSearchParams({});
    }
  }

  return (
    <>
      <AnnouncementBar promotion={activePromotion} />
      <section className={styles.products}>
        <div className={styles.inner}>
          <SectionHeading
            eyebrow="Catálogo"
            title="Nuestros productos"
            align="center"
          />

          {error && <p className={styles.error}>{error}</p>}

          {isLoading ? null : (
            <>
              <ul className={styles.filters}>
                <li>
                  <button
                    type="button"
                    className={styles.filter}
                    data-active={selectedCategory === null}
                    onClick={() => handleSelectCategory(null)}
                  >
                    Todos
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      className={styles.filter}
                      data-active={isSameCategory(category, selectedCategory)}
                      onClick={() => handleSelectCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
              {visibleProducts.length === 0 ? (
                <p className={styles.status}>
                  Todavía no hay productos en esta categoría.
                </p>
              ) : (
                <ul ref={gridRef} className={styles.grid}>
                  {visibleProducts.map((product) => (
                    <li key={product.id} data-reveal="hidden">
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Products;
