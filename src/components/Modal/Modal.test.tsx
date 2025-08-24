import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';
import Modal from './Modal';
import { screen } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('Modal', () => {
  it('should render modal and children', () => {
    renderWithProviders(
      <Modal isOpen={true} handleClose={vi.fn()}>
        <p>Hello there!</p>
      </Modal>
    );

    expect(screen.getByText('Hello there!')).toBeInTheDocument();
  });

  it('should not render modal when isOpen is set to false', () => {
    renderWithProviders(
      <Modal isOpen={false} handleClose={vi.fn()}>
        <p>Hello there!</p>
      </Modal>
    );

    expect(screen.queryByText('Hello there!')).not.toBeInTheDocument();
  });
});
