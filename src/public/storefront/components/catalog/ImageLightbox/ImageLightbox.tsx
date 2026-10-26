import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { useBodyScrollLock } from '@shared/hooks/useBodyScrollLock';
import styles from './ImageLightbox.module.css';

const ZOOM_SCALE = 2.5;

interface ImageLightboxProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

interface FocusPoint {
  x: number;
  y: number;
}

function ImageLightbox({
  src,
  alt,
  title,
  subtitle,
  onClose,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [baseWidth, setBaseWidth] = useState<number | null>(null);
  const [focus, setFocus] = useState<FocusPoint | null>(null);
  const [hasError, setHasError] = useState(false);
  const isZoomed = focus !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  useBodyScrollLock(true);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !focus) return;

    stage.scrollLeft = focus.x * stage.scrollWidth - stage.clientWidth / 2;
    stage.scrollTop = focus.y * stage.scrollHeight - stage.clientHeight / 2;
  }, [focus]);

  function zoomAt(point: FocusPoint) {
    const image = imageRef.current;
    if (!image) return;

    setBaseWidth(image.getBoundingClientRect().width);
    setFocus(point);
  }

  function handleImageClick(event: MouseEvent<HTMLImageElement>) {
    if (isZoomed) {
      setFocus(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    zoomAt({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  }

  function toggleZoom() {
    if (hasError) return;
    if (isZoomed) {
      setFocus(null);
    } else {
      zoomAt({ x: 0.5, y: 0.5 });
    }
  }

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-label={`Imagen de ${title}`}
      onClose={onClose}
      onClick={handleDialogClick}
    >
      <div className={styles.toolbar}>
        <div className={styles.caption}>
          <p className={styles.title}>{title}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label={isZoomed ? 'Alejar imagen' : 'Acercar imagen'}
            disabled={hasError}
            onClick={toggleZoom}
          >
            {isZoomed ? '−' : '+'}
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Cerrar"
            onClick={onClose}
            autoFocus
          >
            ×
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={styles.stage}
        data-zoomed={isZoomed}
        onClick={(event) => {
          if (event.target === event.currentTarget && !isZoomed) onClose();
        }}
      >
        {hasError ? (
          <p className={styles.error}>No se pudo cargar la imagen.</p>
        ) : (
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className={styles.image}
            style={
              isZoomed && baseWidth
                ? {
                    width: baseWidth * ZOOM_SCALE,
                    maxWidth: 'none',
                    maxHeight: 'none',
                  }
                : undefined
            }
            onClick={handleImageClick}
            onError={() => setHasError(true)}
            draggable={false}
          />
        )}
      </div>

      <p className={styles.hint} hidden={hasError}>
        {isZoomed
          ? 'Desplázate para recorrer la imagen · toca para alejar'
          : 'Toca la imagen para acercar'}
      </p>
    </dialog>
  );
}

export default ImageLightbox;
