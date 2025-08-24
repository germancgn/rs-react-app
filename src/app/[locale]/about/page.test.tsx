import { describe, expect, it } from 'vitest';
import AboutPage from './page';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../__tests__/test-utils/renderWithProviders';

describe('About page', () => {
  it('should render about page', () => {
    renderWithProviders(<AboutPage />);

    expect(
      screen.getByRole('link', { name: /RS School React Course/i })
    ).toBeInTheDocument();
  });
});
