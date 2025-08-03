import { describe, it, vi, expect, beforeEach } from 'vitest';
import * as downloadUtils from './download';

describe('downloadString', () => {
  let createObjectURLMock: ReturnType<typeof vi.fn>;
  let clickMock: ReturnType<typeof vi.fn>;
  let createElementSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    createObjectURLMock = vi.fn(() => 'blob:url');
    clickMock = vi.fn();
    createElementSpy = vi.fn(() => ({
      href: '',
      download: '',
      click: clickMock,
    }));

    window.URL.createObjectURL = createObjectURLMock;
    vi.spyOn(document, 'createElement').mockImplementation(createElementSpy);
  });

  it('creates a blob URL and clicks a link to download the file', () => {
    downloadUtils.downloadString('hello', 'test.txt', 'text/plain');

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');

    const link = createElementSpy.mock.results[0].value;
    expect(link.download).toBe('test.txt');
    expect(link.href).toBe('blob:url');
    expect(clickMock).toHaveBeenCalled();
  });
});
