import { render, screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import About from './About';
import { MemoryRouter } from 'react-router-dom';

describe('About.tsx', () => {
  it('should render About page with the link to the RS School course', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /RS School React Course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
