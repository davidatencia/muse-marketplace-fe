import type { GalleryItem } from '@public/storefront/types/content'
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder'
import SectionHeading from '@shared/components/ui/SectionHeading/SectionHeading'
import { useRevealOnScroll } from '@shared/hooks/useRevealOnScroll'
import styles from './Gallery.module.css'

interface GalleryProps {
  heading: string
  items: GalleryItem[]
  eyebrow?: string
}

function Gallery({ heading, items, eyebrow }: GalleryProps) {
  const gridRef = useRevealOnScroll<HTMLUListElement>()

  return (
    <section className={styles.gallery}>
      <div className={styles.inner}>
        <SectionHeading eyebrow={eyebrow} title={heading} align="center" />
        <ul ref={gridRef} className={styles.grid}>
          {items.map((item) => (
            <li key={item.id} data-reveal="hidden">
              <div className={styles.frame}>
                <ImagePlaceholder src={item.src} label={item.alt} ratio="1 / 1" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Gallery
