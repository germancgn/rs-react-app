import { describe, it, expect } from 'vitest';
import { createBlob } from './download';

describe('download', () => {
  it('creates a blob with correct mime type', () => {
    const csvData = 'id,title\n2394,Titanic';
    const mimeType = 'text/csv';
    const blob = createBlob(csvData, mimeType);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/csv;charset=utf-8;');
  });
});
