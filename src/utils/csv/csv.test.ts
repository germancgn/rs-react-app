import { describe, expect, it } from 'vitest';
import { objectToCSV } from './csv';

describe('csv.ts', () => {
  it('should parse an object and return csv with headers and data', () => {
    const items = [
      {
        title: 'data 1',
        description: 'data 2',
        releaseData: 'data 3',
      },
    ];

    const csvContent = objectToCSV(items);
    expect(csvContent).toBeTypeOf('string');

    const [headerRow, dataRow] = csvContent.split('\n');
    const expectedHeader = Object.keys(items[0]).join(',');
    const expectedData = Object.values(items[0])
      .map((str) => `"${str}"`)
      .join(',');

    expect(headerRow).toEqual(expectedHeader);
    expect(dataRow).toEqual(expectedData);
  });
});
