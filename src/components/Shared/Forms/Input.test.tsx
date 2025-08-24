import { describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../__tests__/test-utils/renderWithProviders';
import { afterEach } from 'node:test';
import Input from './Input';

afterEach(() => {
  cleanup();
});

describe('Input', () => {
  it('should render input with correct data', () => {
    renderWithProviders(
      <Input
        id="test"
        name="test"
        errors={null}
        type="password"
        label="Password"
        placeholder="Enter password"
      />
    );

    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  it('should display errors', () => {
    renderWithProviders(
      <Input
        id="test"
        name="test"
        type="password"
        label="Password:"
        placeholder="Enter password"
        errors={['fieldRequired']}
      />
    );

    expect(screen.getByText(/Field is required/i)).toBeInTheDocument();
  });
});
