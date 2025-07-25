import { it, expect, describe, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { type JSX } from 'react';
import ErrorBoundary from './ErrorBoundary';

afterEach(() => {
  cleanup();
});

type ComponentThrowsErrorType<T> = {
  errorToThrow?: T extends Error ? T : undefined;
};

function ComponentThrowsError<T>({
  errorToThrow,
}: ComponentThrowsErrorType<T>): JSX.Element {
  if (errorToThrow) {
    throw errorToThrow;
  }
  throw new Error('Component Error');
}

describe('ErrorBoundary', () => {
  it('renders the provided fallback UI when error occurs in a child component', () => {
    const ERROR_MESSAGE = 'Error message for testing';
    render(
      <ErrorBoundary fallback={<p>{ERROR_MESSAGE}</p>}>
        <ComponentThrowsError />
      </ErrorBoundary>
    );
    const fallbackUI = screen.getByText(new RegExp(ERROR_MESSAGE));
    expect(fallbackUI).toBeInTheDocument();
  });

  it('renders default fallback UI when error occurs in a child component', () => {
    const DEFAULT_ERROR_MESSAGE = 'Please reload the page or try again later.';
    render(
      <ErrorBoundary>
        <ComponentThrowsError />
      </ErrorBoundary>
    );
    const fallbackUI = screen.getByText(new RegExp(DEFAULT_ERROR_MESSAGE));
    expect(fallbackUI).toBeInTheDocument();
  });

  it('catches an error and renders fallback UI with the correct error message', () => {
    const customErrorMessage = 'Custom error messages';
    const errorWithCustomMessage = new Error(customErrorMessage);
    render(
      <ErrorBoundary>
        <ComponentThrowsError errorToThrow={errorWithCustomMessage} />
      </ErrorBoundary>
    );
    const errorDiv = screen.getByText(customErrorMessage);
    expect(errorDiv).toBeInTheDocument();
  });
});
