import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import MovieListError from './MovieListError';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  cleanup();
});

describe('MovieListError', () => {
  it('should render error message provided via props', () => {
    const error = new Error('Something went wrong');
    render(<MovieListError error={error} onRetry={vi.fn()} />);
    const errorMessage = screen.getByText('Error: ' + error.message);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should call onRetry function', async () => {
    const retryFn = vi.fn();
    render(<MovieListError error={new Error()} onRetry={retryFn} />);
    const retryBtn = screen.getByRole('button', {
      name: /Retry/,
    });
    await userEvent.click(retryBtn);
    expect(retryFn).toBeCalled();
  });
});
