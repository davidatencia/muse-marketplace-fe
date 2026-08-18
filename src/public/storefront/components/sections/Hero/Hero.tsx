import Button from '@shared/components/ui/Button/Button';
import Eyebrow from '@shared/components/ui/Eyebrow/Eyebrow';
import GradientBackground from '@shared/components/ui/GradientBackground/GradientBackground';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import styles from './Hero.module.css';

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

function Hero({ eyebrow, title, description, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section id="inicio" className={styles.hero}>
      <GradientBackground />
      <div className={styles.inner}>
        <div className={styles.content}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
        <div className={styles.media}>
          <ImagePlaceholder
            ratio="4 / 5"
            label="Foto de producto"
            src="https://res.cloudinary.com/iyrl9jhg/image/upload/v1786687640/muse-illustration-02.png"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
