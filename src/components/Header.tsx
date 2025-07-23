import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';
import { trendingMovies } from '../services/movie-service';
import { type Movie } from '../types/movies/Movie';
import FeaturedMovieCard from './FeaturedMovieCard';

type HeaderProps = {
  searchTerm: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
};

const defaultMovie: Movie = {
  adult: false,
  backdrop_path: '/SPkEiZGxq5aHWQ2Zw7AITwSEo2.jpg',
  genre_ids: [12, 28, 878],
  id: 181812,
  original_language: 'en',
  original_title: 'Star Wars: The Rise of Skywalker',
  overview:
    'The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins.',
  popularity: 9.2901,
  poster_path: '/db32LaOibwEliAmSL2jjDF6oDdj.jpg',
  release_date: '2019-12-18',
  title: 'Star Wars: The Rise of Skywalker',
  video: false,
  vote_average: 6.289,
  vote_count: 10274,
  media_type: 'movie',
};

export default function Header({
  searchTerm,
  onInputChange,
  onSearch,
  isLoading,
}: HeaderProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(defaultMovie);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    trendingMovies().then((data) => {
      setMovies(data.results);
      setSelectedMovie(data.results[0] ?? defaultMovie);
    });
  }, []);
  return (
    <header>
      <div
        className="header-hero m-auto max-w-7xl"
        style={
          {
            '--fade-radius': '50%',
            backgroundImage: `radial-gradient(circle, transparent, rgb(7, 7, 13) var(--fade-radius)), url(https://image.tmdb.org/t/p/w1280/${selectedMovie.backdrop_path})`,
          } as React.CSSProperties
        }
      >
        <nav className="flex flex-col m-auto sm:flex-row items-center justify-between gap-4 p-4 rounded-lg">
          <ul className="flex gap-8">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
          </ul>
          <div className="flex max-sm:w-full sm:items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={onInputChange}
              placeholder="Search movies..."
              className="w-full sm:w-64 p-2 bg-blue-950/10 backdrop-blur-md border border-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e94560]"
            />
            <button
              onClick={onSearch}
              className="py-2 px-4 bg-[#e94560] text-white rounded-lg hover:bg-[#d13450] hover:cursor-pointer flex items-center gap-2"
              disabled={isLoading}
            >
              Search {isLoading && <Spinner size={16} />}
            </button>
          </div>
        </nav>
        <div className="flex flex-col sm:w-1/2 h-[auto] md:pb-[200px] p-4 gap-4">
          <h2 className="text-[min(10vw,48px)] text-white  font-bold mt-4">
            {selectedMovie.title}
          </h2>
          <p className="text-gray-300 break-words">
            {selectedMovie.overview.slice(0, 150)}
          </p>

          <div className="flex gap-4 mt-auto pb-4">
            <button className="cursor-pointer text-white font-semibold bg-blue-500 py-2 px-4 rounded-md">
              Watch now
            </button>
            <button className="cursor-pointer text-gray-300 font-semibold border-2 border-gray-300 py-2 px-4 rounded-md">
              More info
            </button>
          </div>
        </div>
      </div>
      <div className="m-auto max-w-7xl p-4 md:-translate-y-[200px] md:mb-[-200px]">
        <h2 className="text-xl lg:text-2xl text-white font-bold mb-4">
          Trending movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 p-4 gap-4 bg-blue-950/10 backdrop-blur-md border border-white/10 rounded-2xl">
          {movies.slice(0, 5).map((movie) => (
            <FeaturedMovieCard
              onHover={() => setSelectedMovie(movie)}
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
