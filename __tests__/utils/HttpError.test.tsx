import { it, expect, describe } from 'vitest';
import HttpError from '../../src/utils/HttpError';

describe('HttpError', () => {
  it('creates an error with status and message', () => {
    const NotFoundCode = 404;
    const NotFoundText = 'NotFound';
    const error = new HttpError(NotFoundCode, NotFoundText);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpError');
    expect(error.status).toBe(NotFoundCode);
    expect(error.message).toBe(NotFoundText);
  });
});
