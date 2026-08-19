import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import SectionHeading from '@shared/components/ui/SectionHeading/SectionHeading';
import { getAccessories } from '@shared/api/accessoriesApi';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import type { Accessory } from '@shared/types/accessory';
import styles from './Products.module.css';

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const [products, setProducts] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getAccessories()
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((err) => {
        if (!ignore) {
          setError(getErrorMessage(err, 'No se pudo cargar el catálogo'));
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const visibleProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  function handleSelectCategory(category: string | null) {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  }

  return (
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
                    data-active={selectedCategory === category}
                    onClick={() => handleSelectCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
            {visibleProducts.length === 0 ? (
              <p className={styles.status}>Todavía no hay productos en esta categoría.</p>
            ) : (
              <ul className={styles.grid}>
                {visibleProducts.map((product) => (
                  <li key={product.id} className={styles.card}>
                    <ImagePlaceholder label={product.name} src={product.img} />
                    <p className={styles.category}>{product.category}</p>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.price}>
                      {currencyFormatter.format(product.price)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Products;
