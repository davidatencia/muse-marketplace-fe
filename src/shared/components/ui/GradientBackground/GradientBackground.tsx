import { useEffect, useRef } from 'react';
import { NeatGradient } from '@firecms/neat';
import styles from './GradientBackground.module.css';

interface GradientColor {
  color: string;
  influence?: number;
}

const DEFAULT_COLORS: GradientColor[] = [
  { color: '#ffffff' },
  { color: '#e3d0ea' },
  { color: '#9b71b2' },
  { color: '#3a1c36', influence: 0.4 },
  { color: '#6c6d11', influence: 0.35 },
  { color: '#374126', influence: 0.35 },
];

interface GradientBackgroundProps {
  colors?: GradientColor[];
  speed?: number;
}

function GradientBackground({
  colors = DEFAULT_COLORS,
  speed = 1,
}: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const gradient = new NeatGradient({
      ref: canvasRef.current,
      colors: colors.map(({ color, influence }) => ({
        color,
        enabled: true,
        influence,
      })),
      speed: prefersReducedMotion ? 0 : speed,
      waveFrequencyX: 1,
      waveFrequencyY: 1,
      waveAmplitude: 6,
      colorBlending: 6,
      resolution: 1,
      backgroundColor: '#ffffff',
      backgroundAlpha: 1,
    });

    return () => gradient.destroy();
  }, [colors, speed]);

  return (
    <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
  );
}

export default GradientBackground;
