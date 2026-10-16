import type { ReactNode } from 'react';

export interface Column<T> {
  /** Displayed column header. */
  header: string;
  /** Key used to read the cell value from each row object. */
  key: keyof T;
  /** Optional custom cell rendering. Receives the cell value and full row. */
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Array<Column<T>>;
  data: Array<T>;
  striped?: boolean;
  emptyMessage?: string;
  caption?: string;
  /**
   * Stable key for each row. When omitted, the Table looks for an `id`
   * field on the row and only falls back to the row index otherwise.
   */
  getRowKey?: (row: T, index: number) => string | number;
}

function defaultRowKey<T>(row: T, index: number): string | number {
  if (typeof row === 'object' && row !== null && 'id' in row) {
    const id = (row as Record<string, unknown>).id;
    if (typeof id === 'string' || typeof id === 'number') return id;
  }
  return index;
}

/**
 * Generic, reusable Table driven entirely by props.
 * Renders semantic `<table>` markup, dynamic headers and rows,
 * optional striped styling, and a graceful empty state.
 */
export function Table<T>({
  columns,
  data,
  striped = false,
  emptyMessage = 'No rows to display.',
  caption,
  getRowKey,
}: TableProps<T>) {
  const colSpan = Math.max(columns.length, 1);

  return (
    <div className="table-wrapper">
      <table className={striped ? 'table table--striped' : 'table'}>
        {caption ? <caption className="table__caption">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={colSpan} className="table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const key = getRowKey
                ? getRowKey(row, rowIndex)
                : defaultRowKey(row, rowIndex);
              return (
                <tr key={key}>
                  {columns.map((column) => {
                    const value = row[column.key];
                    return (
                      <td key={String(column.key)}>
                        {column.render
                          ? column.render(value, row)
                          : (value as ReactNode)}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
