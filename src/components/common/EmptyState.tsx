import type { ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/**
 * Reusable empty-state message shown when there is no data to display.
 * Only `title` is required; the description and an optional action (such as a
 * button) keep the component easy to use in many situations.
 */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h2 className="empty-state__title">{title}</h2>
      {description ? (
        <p className="empty-state__description">{description}</p>
      ) : null}
      {action ? <div className="empty-state__action">{action}</div> : null}
    </div>
  );
}
