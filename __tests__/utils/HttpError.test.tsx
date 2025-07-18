import { it, expect, describe } from 'vitest';
import HttpError from '../../src/utils/HttpError';

describe('HttpError', () => {
  it('creates an error with status and message', () => {
    const NOT_FOUND = 404;
    const NOT_FOUND_TEXT = 'NotFound';
    const error = new HttpError(NOT_FOUND, NOT_FOUND_TEXT);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpError');
    expect(error.status).toBe(NOT_FOUND);
    expect(error.message).toBe(NOT_FOUND_TEXT);
  });
});
