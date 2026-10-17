import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

/**
 * shadcn/ui-style Card composition for the Products feature.
 *
 * Kept separate from the legacy Assignment 02 `Card.tsx`, which stays
 * untouched. Products code uses this composable set: Card, CardHeader,
 * CardTitle, CardDescription, CardContent, CardFooter.
 *
 * Note: named `shadcn-card.tsx` (instead of `card.tsx`) because the repo
 * runs on a case-insensitive filesystem where `card.tsx` would collide with
 * the legacy `Card.tsx`.
 */

type CardDivProps = HTMLAttributes<HTMLDivElement>;

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

export function Card({ className, ...props }: CardDivProps) {
  return <article className={cn('products-card', className)} {...props} />;
}

export function CardHeader({ className, ...props }: CardDivProps) {
  return <div className={cn('products-card__header', className)} {...props} />;
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3 className={cn('products-card__title', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, ...props }: CardDivProps) {
  return <p className={cn('products-card__description', className)} {...props} />;
}

export function CardContent({ className, ...props }: CardDivProps) {
  return <div className={cn('products-card__content', className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardDivProps) {
  return <div className={cn('products-card__footer', className)} {...props} />;
}
