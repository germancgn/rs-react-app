import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import PasswordStrength from './PasswordStrength';
import { renderWithProviders } from '../../../__tests__/test-utils/renderWithProviders';

describe('PasswordStrength', () => {
  it('should render component with the error message', () => {
    renderWithProviders(
      <PasswordStrength
        rules={{
          uppercase: true,
          lowercase: true,
          digits: true,
          symbols: true,
        }}
      />
    );

    expect(screen.getByTestId(/password-strength/i)).toBeInTheDocument();
  });
});
