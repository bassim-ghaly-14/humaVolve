import type { ReactNode } from 'react';

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}

/**
 * Reusable Card that renders a title, description, an optional image,
 * and optional nested content via `children`.
 * Uses semantic `<article>` markup and stays free of page-specific data.
 */
export function Card({
  title,
  description,
  image,
  imageAlt,
  children,
}: CardProps) {
  return (
    <article className="card">
      {image ? (
        <img
          className="card__image"
          src={image}
          alt={imageAlt ?? `${title} illustration`}
          loading="lazy"
        />
      ) : null}
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
        {children ? <div className="card__children">{children}</div> : null}
      </div>
    </article>
  );
}
