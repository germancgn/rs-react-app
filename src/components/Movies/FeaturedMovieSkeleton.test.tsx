import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FeaturedMovieSkeleton from './FeaturedMovieSkeleton';

describe('FeaturedMovieCardSkeleton', () => {
  it('should be rendered', () => {
    render(<FeaturedMovieSkeleton />);

    const movieCard = screen.getByTestId('featured-card-featured-skeleton');
    expect(movieCard).toBeInTheDocument();
  });
});
