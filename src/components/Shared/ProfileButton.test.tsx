import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';
import ProfileButton from './ProfileButton';
import { screen } from '@testing-library/dom';

describe('ProfileButton', () => {
  it('should render and display provided props', () => {
    const profileData = {
      name: 'John',
      age: 30,
      email: 'example@example.com',
      password: '',
      repeatPassword: '',
      gender: 'male',
      acceptTerms: true,
      picture: '',
      country: 'Russia',
    };
    renderWithProviders(
      <ProfileButton profileData={profileData} onLogout={vi.fn()} />
    );

    expect(screen.getByText(profileData.email)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: profileData.name })
    ).toBeInTheDocument();
  });
});
