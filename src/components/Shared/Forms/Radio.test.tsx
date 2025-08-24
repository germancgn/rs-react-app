import { describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';
import Radio from './Radio';
import { renderWithProviders } from '../../../__tests__/test-utils/renderWithProviders';
import { afterEach } from 'node:test';

afterEach(() => {
  cleanup();
});

const radioOptions = [
  { option: 'male', optionLabel: 'Male' },
  { option: 'female', optionLabel: 'Female' },
];

describe('Radio', () => {
  it('should render Radio with correct data', () => {
    renderWithProviders(
      <Radio
        id="test"
        label="Gender"
        name="test"
        errors={null}
        options={[...radioOptions]}
      />
    );

    expect(screen.getByText('Gender:')).toBeInTheDocument();
    radioOptions.forEach((option) => {
      expect(screen.getByLabelText(option.optionLabel)).toBeInTheDocument();
    });
  });

  it('should display errors', () => {
    renderWithProviders(
      <Radio
        id="test"
        label="label"
        name="test"
        errors={['fieldRequired']}
        options={[...radioOptions]}
      />
    );

    expect(screen.getByText(/Field is required/i)).toBeInTheDocument();
  });
});
