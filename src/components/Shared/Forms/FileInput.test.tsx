import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import FileInput from './FileInput';
import { renderWithProviders } from '../../../__tests__/test-utils/renderWithProviders';

afterEach(() => {
  cleanup();
});

describe('FileInput', () => {
  it('should render FileInput', () => {
    renderWithProviders(
      <FileInput
        id="test"
        label="Picture"
        name="test"
        errors={null}
        accept="image/jpeg"
      />
    );

    expect(screen.getByText('Picture:')).toBeInTheDocument();
  });

  it('should display errors', () => {
    renderWithProviders(
      <FileInput
        id="test"
        label="label"
        name="test"
        errors={['fieldRequired']}
        accept="image/jpeg"
      />
    );

    expect(screen.getByText(/Field is required/i)).toBeInTheDocument();
  });
});
