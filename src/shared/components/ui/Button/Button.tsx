import type { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'outline';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler;
  disabled?: boolean;
}

function Button({
  children,
  href,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={className} onClick={onClick}>
          {children}
        </Link>
      );
    }

    const isExternal =
      href.startsWith('http://') || href.startsWith('https://');

    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
