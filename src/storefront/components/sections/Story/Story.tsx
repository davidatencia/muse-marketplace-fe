import Button from '@shared/components/ui/Button/Button';
import Eyebrow from '@shared/components/ui/Eyebrow/Eyebrow';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import styles from './Story.module.css';

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
        <ImagePlaceholder
          src="https://res.cloudinary.com/iyrl9jhg/image/upload/v1786636136/cami-retrato.jpg"
          ratio="1 / 1"
          label="Foto de la marca"
        />
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
