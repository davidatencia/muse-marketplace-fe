import Button from '@shared/components/ui/Button/Button';
import Eyebrow from '@shared/components/ui/Eyebrow/Eyebrow';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import styles from './Story.module.css';

// Cloudinary resizes and picks the best format; the original is ~3000x4000.
const PORTRAIT_URL =
  'https://res.cloudinary.com/iyrl9jhg/image/upload/f_auto,q_auto,c_limit,w_900/v1786636136/cami-retrato.jpg';

interface StoryProps {
  heading: string;
  paragraphs: string[];
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

function Story({
  heading,
  paragraphs,
  eyebrow,
  ctaLabel,
  ctaHref,
}: StoryProps) {
  return (
    <section id="nosotros" className={styles.story}>
      <div className={styles.media}>
        <div className={styles.frame}>
          <ImagePlaceholder
            src={PORTRAIT_URL}
            ratio="4 / 5"
            label="Foto de la marca"
          />
        </div>
        <span className={styles.badge}>
          <span aria-hidden="true">✦</span> Hecho a mano
        </span>
        <span className={styles.sparkle} aria-hidden="true">
          ✦
        </span>
      </div>
      <div className={styles.content}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className={styles.heading}>{heading}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        {ctaLabel && ctaHref && (
          <Button href={ctaHref} variant="outline">
            {ctaLabel}
          </Button>
        )}
      </div>
    </section>
  );
}

export default Story;
