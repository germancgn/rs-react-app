export function objectToCSV<T extends Record<string, unknown>>(
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

  return [headers.join(','), ...rows].join('\n');
}
