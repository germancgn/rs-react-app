import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';
import ControlledForm from './ControlledForm';
import { screen } from '@testing-library/dom';

describe('ControllerForm', () => {
  it('should render form with all fields', () => {
    renderWithProviders(<ControlledForm hideModal={vi.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  });
});
