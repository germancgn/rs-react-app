import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';
import { Pagination } from './Pagination';
import { screen } from '@testing-library/dom';

describe('Pagination', () => {
  it('should render Pagination with props', () => {
    renderWithProviders(
      <Pagination
        page={1}
        totalPages={10}
        onNextPage={vi.fn()}
        onPrevPage={vi.fn()}
      />
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
