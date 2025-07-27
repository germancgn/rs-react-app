import { render } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Spinner } from './Spinner';

describe('Spinner.tsx', () => {
  it('renders the spinner with the spin-animation class', () => {
    const { container } = render(
      <MemoryRouter>
        <Spinner size={32} />
      </MemoryRouter>
    );

    const spinnerElement = container.querySelector('.spin-animation');
    expect(spinnerElement).toBeInTheDocument();
  });
});
