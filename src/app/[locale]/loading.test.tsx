import { describe, expect, it } from 'vitest';
import LoadingPage from './loading';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';

describe('Loading page', () => {
  it('should render loading page', () => {
    renderWithProviders(<LoadingPage />);

    expect(screen.getByTestId('loading-page')).toBeInTheDocument();
  });
});
