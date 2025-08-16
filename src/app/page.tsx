// import { Metadata } from 'next';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Header from '../components/Header/Header';
import PopularMoviesContainer from '../components/Movies/PopularMoviesContainer';
import SearchMoviesContainer from '../components/Movies/SearchMoviesContainer';
import { SelectedMoviesBar } from '../components/Movies/SelectedMoviesBar';
import { fetchPopularMovies, trendingMovies } from '../services/movie-service';

// export const metadata: Metadata = {
//   title: 'Home | React Movie Apps',
//   description: 'Watch movies for free on React Movie App',
// };

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const search = searchParams.search;

  const [trendingMoviesResponse] = await Promise.all([
    trendingMovies(),
    fetchPopularMovies(),
  ]);

  return (
    <div className="min-h-screen mx-auto bg-gray-200 dark:bg-gradient-to-b from-[#07070D] to-[#0d0d18] text-gray-300">
      <Header movies={trendingMoviesResponse.results} />
      <ErrorBoundary>
        {search ? (
          <SearchMoviesContainer searchTerm={search} />
        ) : (
          <PopularMoviesContainer />
        )}
      </ErrorBoundary>
      <SelectedMoviesBar />
    </div>
  );
}
