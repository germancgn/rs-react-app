export function downloadString(
  content: string,
  filename = 'file.txt',
  mimeType = 'text/plain'
) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
}

export function downloadCSV(csv: string, filename = 'data.csv') {
  downloadString(csv, filename, 'text/csv');
}
