export function downloadCSV<T extends Record<string, unknown>>(
  items: T[],
  keys?: (keyof T)[]
) {
  const headers = (keys ?? Object.keys(items[0] ?? {})) as string[];
  const rows = items.map((item) => {
    return headers
      .map((key) => {
        const value = item[key];
        const escaped = String(value).replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${items.length}-selected-movies.csv`;
  link.click();
}
