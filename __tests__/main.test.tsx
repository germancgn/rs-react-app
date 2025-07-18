import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom/vitest';

describe('main.tsx', () => {
  it('renders the App component without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
