import { render } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner.tsx', () => {
  it('renders the spinner with the spin-animation class', () => {
    const { container } = render(<Spinner size={32} />);

    const spinnerElement = container.querySelector('.spin-animation');
    expect(spinnerElement).toBeInTheDocument();
  });
});
