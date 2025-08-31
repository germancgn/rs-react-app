import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SortAscending, SortDescending } from './Icon';

type TableProps<T extends Record<string, unknown>> = {
  headers: Header[];
  rows: T[];
  keyForRow: (row: T) => string;
  onRowSelect?: (row: T) => void;
};

type Header = {
  key: string;
  displayName: string;
  selected: boolean;
  format: boolean;
};

const numberFormatter = new Intl.NumberFormat('en-US');

export default function Table<T extends Record<string, unknown>>({
  headers,
  rows,
  keyForRow: rowKey,
  onRowSelect,
}: TableProps<T>) {
  const [sortBy, setSortBy] = useState<{
    key: string;
    order: 'ASC' | 'DESC';
  } | null>(null);
  const prevDataKeysRef = useRef<string[]>([]);

  const sortedRows = useMemo(() => {
    const dataToSort = [...rows];
    if (!sortBy?.key) return rows;
    const sorted = dataToSort.sort((a, b) => {
      const aValue = a[sortBy.key];
      const bValue = b[sortBy.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortBy.order === 'ASC'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortBy.order === 'ASC' ? aValue - bValue : bValue - aValue;
      } else if (aValue === undefined && bValue !== undefined) {
        return sortBy.order === 'ASC' ? -1 : 1;
      } else if (bValue === undefined && aValue !== undefined) {
        return sortBy.order === 'ASC' ? 1 : -1;
      } else {
        return 0;
      }
    });

    return sorted;
  }, [sortBy, rows]);

  useEffect(() => {
    prevDataKeysRef.current = rows.map((row) => rowKey(row));
  }, [rows, rowKey]);

  const onSort = useCallback((key: string) => {
    setSortBy((prev) => {
      if (prev === null || prev.key !== key) {
        return {
          key,
          order: 'DESC',
        };
      } else {
        return {
          ...prev,
          order: prev.order === 'ASC' ? 'DESC' : 'ASC',
        };
      }
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th onClick={() => onSort(header.key)} key={header.key}>
              {header.displayName}

              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {header.key === sortBy?.key ? (
                  <span className="sort-button active">
                    {sortBy?.order === 'ASC' ? (
                      <SortAscending size={20} />
                    ) : (
                      <SortDescending size={20} />
                    )}
                  </span>
                ) : (
                  <span className="sort-button">
                    <SortAscending size={20} />
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRows &&
          sortedRows.length > 0 &&
          sortedRows.map((row) => {
            const key = rowKey(row);
            const isNew = !prevDataKeysRef.current.includes(key);

            return (
              <tr
                onClick={() => onRowSelect?.(row)}
                key={key}
                className={isNew ? 'new' : ''}
              >
                {headers.map((header) => (
                  <td key={header.key}>
                    {row[header.key] !== undefined ? (
                      header.format ? (
                        numberFormatter.format(row[header.key] as number)
                      ) : (
                        (row[header.key] as string)
                      )
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
