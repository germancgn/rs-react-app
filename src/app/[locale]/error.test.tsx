import { describe, expect, it } from 'vitest';
import ErrorPage from './error';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';

describe('Error page', () => {
  it('should render error page with the error message', () => {
    renderWithProviders(<ErrorPage />);

    expect(
      screen.getByText(/Something went wrong. Please try again later./i)
    ).toBeInTheDocument();
  });
});
