import { useEffect, useRef } from 'react';

const STAGGER_MS = 90;

export function useRevealOnScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>('[data-reveal="hidden"]'),
    );
    if (items.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => {
        item.dataset.reveal = 'visible';
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const item = entry.target as HTMLElement;
          item.style.setProperty('--reveal-delay', `${order * STAGGER_MS}ms`);
          item.addEventListener(
            'transitionend',
            () => item.style.removeProperty('--reveal-delay'),
            { once: true },
          );
          item.dataset.reveal = 'visible';
          observer.unobserve(item);
          order += 1;
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  });

  return containerRef;
}
