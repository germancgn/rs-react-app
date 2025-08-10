export function createBlob(content: string, mimeType = 'text/plain') {
  return new Blob([content], { type: `${mimeType};charset=utf-8;` });
}
