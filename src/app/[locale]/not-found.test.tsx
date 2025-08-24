import { describe, expect, it } from 'vitest';
import NotFoundPage from './not-found';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';

describe('Loading page', () => {
  it('should render loading page', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByText(/404 Not found/i)).toBeInTheDocument();
  });
});
