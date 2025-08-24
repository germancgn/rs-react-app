import { describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';
import Checkbox from './Checkbox';
import { renderWithProviders } from '../../../__tests__/test-utils/renderWithProviders';
import { afterEach } from 'node:test';

afterEach(() => {
  cleanup();
});

describe('Checkbox', () => {
  it('should render checkbox with correct data', () => {
    renderWithProviders(
      <Checkbox
        id="test"
        label="label"
        name="test"
        errors={null}
        defaultValue={false}
        checkboxLabel="test"
      />
    );

    expect(screen.getByRole('checkbox', { name: 'test' })).toBeInTheDocument();
  });

  it('should display errors', () => {
    renderWithProviders(
      <Checkbox
        id="test"
        label="label"
        name="test"
        errors={['fieldRequired']}
        defaultValue={false}
        checkboxLabel="test"
      />
    );

    expect(screen.getByText(/Field is required/i)).toBeInTheDocument();
  });
});
