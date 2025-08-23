import { Metadata } from 'next';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Header from '../../components/Header/Header';
import PopularMoviesContainer from '../../components/Movies/PopularMoviesContainer';
import SearchMoviesContainer from '../../components/Movies/SearchMoviesContainer';
import { SelectedMoviesBar } from '../../components/Movies/SelectedMoviesBar';
import {
  fetchPopularMovies,
  trendingMovies,
} from '../../services/movie-service';

export const metadata: Metadata = {
  title: 'Home | React Movie Apps',
  description: 'Watch movies for free on React Movie App',
};

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const search = (await searchParams).search;
  const popularPage = Number((await searchParams).popularPage ?? 1);
  const locale = (await params).locale;

  const [trendingMoviesResponse, initialPopularMovies] = await Promise.all([
    trendingMovies(1, locale),
    fetchPopularMovies(popularPage, locale),
  ]);

  return (
    <div className="min-h-screen mx-auto bg-gray-200 dark:bg-gradient-to-b from-[#07070D] to-[#0d0d18] text-gray-300">
      <Header movies={trendingMoviesResponse.results} />
      <ErrorBoundary>
        {search ? (
          <SearchMoviesContainer searchTerm={search} />
        ) : (
          <PopularMoviesContainer
            initialData={initialPopularMovies}
            initialPage={popularPage}
          />
        )}
      </ErrorBoundary>
      <SelectedMoviesBar />
    </div>
  );
}
