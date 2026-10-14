import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

/**
 * A small, accessible button built on the native `<button>` element.
 * All standard button attributes are forwarded, and a sensible default
 * `type="button"` prevents accidental form submissions.
 */
export function Button({
  children,
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const classes = ['button', `button--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
