import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function createIcon(paths: ReactNode) {
  return function Icon({ size = 18, ...props }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {paths}
      </svg>
    );
  };
}

export const HomeIcon = createIcon(
  <>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V20h5v-6h4v6h5V9.5" />
  </>,
);

export const TagIcon = createIcon(
  <>
    <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </>,
);

export const LayersIcon = createIcon(
  <>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </>,
);

export const GemIcon = createIcon(
  <>
    <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
    <path d="M2 9h20M12 21 8 9l4-6 4 6-4 12" />
  </>,
);

export const StoreIcon = createIcon(
  <>
    <path d="M4 9h16l-1-5H5L4 9Z" />
    <path d="M5 9v11h14V9" />
    <path d="M10 20v-5h4v5" />
  </>,
);

export const LogOutIcon = createIcon(
  <>
    <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />
    <path d="M10 16l-4-4 4-4M6 12h10" />
  </>,
);

export const PlusIcon = createIcon(<path d="M12 5v14M5 12h14" />);

export const PencilIcon = createIcon(
  <>
    <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
    <path d="m13.5 6.5 4 4" />
  </>,
);

export const TrashIcon = createIcon(
  <>
    <path d="M4 7h16M9 7V4h6v3" />
    <path d="M6 7l1 13h10l1-13" />
  </>,
);

export const CheckIcon = createIcon(<path d="m5 12 5 5 9-10" />);

export const XIcon = createIcon(<path d="M6 6l12 12M18 6 6 18" />);

export const SearchIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4-4" />
  </>,
);

export const AlertIcon = createIcon(
  <>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4M12 17h.01" />
  </>,
);

export const BoxIcon = createIcon(
  <>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </>,
);

export const WalletIcon = createIcon(
  <>
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <path d="M3 10h18M16 15h2" />
  </>,
);

export const ChevronRightIcon = createIcon(<path d="m9 6 6 6-6 6" />);

export const ImageIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="m21 16-5-5-9 9" />
  </>,
);

export const MenuIcon = createIcon(<path d="M4 7h16M4 12h16M4 17h16" />);
