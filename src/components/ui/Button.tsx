import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Visible label. Preferred API for Assignment 02.
   * `children` remains supported for backwards compatibility
   * (Assignment 01 callers), but `text` is the documented prop.
   */
  text?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
}

/**
 * Reusable button built on the native `<button>` element.
 * Forwards click events, respects `disabled`, and defaults to
 * `type="button"` to avoid accidental form submissions.
 */
export function Button({
  text,
  children,
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const label = text ?? children;

  const classes = ['button', `button--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {label}
    </button>
  );
}
