import { useState, useEffect } from 'react';
import { trendingMovies } from '../../services/movie-service';
import type { Movie } from '../../types/movies/Movie';
import FeaturedMovieCard from '../Movies/FeaturedMovieCard';
import { X } from '../Shared/Icon';
import { Link } from 'react-router-dom';

type HeaderProps = {
  searchTerm: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onClearInput: () => void;
  isLoading: boolean;
};

export default function Header({
  searchTerm,
  onInputChange,
  onSearch,
  isLoading,
  onClearInput,
}: HeaderProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    trendingMovies().then((data) => {
      setMovies(data.results);
      setSelectedMovie(data.results[0]);
    });
  }, []);

  return (
    <header>
      <div
        className="header-hero m-auto max-w-7xl"
        style={
          {
            '--fade-radius': '50%',
            backgroundImage: `radial-gradient(circle, transparent, rgb(7, 7, 13) var(--fade-radius)), url(https://image.tmdb.org/t/p/w1280/${selectedMovie?.backdrop_path})`,
          } as React.CSSProperties
        }
      >
        <nav className="flex flex-col max-w-6xl m-auto sm:flex-row items-center justify-between gap-4 p-4 rounded-lg">
          <ul className="flex gap-8">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <div className="flex max-sm:w-full sm:items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={onInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch();
                  }
                }}
                placeholder="Search movies..."
                className="w-full sm:w-64 p-2 bg-blue-950/10 backdrop-blur-md border border-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
                onClick={onClearInput}
              >
                {searchTerm && <X size={14} />}
              </span>
            </div>
            <button
              onClick={onSearch}
              className="py-2 px-4 bg-[#e94560] text-white rounded-lg hover:bg-[#d13450] hover:cursor-pointer flex items-center gap-2"
              disabled={isLoading}
            >
              Search
            </button>
          </div>
        </nav>
        <div className="max-w-6xl m-auto lg:mt-[150px] p-4 flex items-center">
          <div className="flex flex-col md:max-w-1/2">
            <h2 className="text-[min(10vw,48px)] text-white font-bold">
              {selectedMovie?.title}
            </h2>
            <p className="text-gray-300 break-words line-clamp-2">
              {selectedMovie?.overview}
            </p>
            <div className="flex gap-4 mt-4">
              <button className="cursor-pointer text-white font-semibold bg-blue-500 py-2 px-4 rounded-md">
                Watch now
              </button>
              <button className="cursor-pointer text-gray-300 font-semibold border-2 border-gray-300 py-2 px-4 rounded-md">
                More info
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto max-w-6xl p-4 md:-translate-y-[200px] md:mb-[-200px]">
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
