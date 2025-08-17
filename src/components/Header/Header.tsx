'use client';

import React from 'react';
import { useState } from 'react';
import type { Movie } from '../../types/movies/Movie';
import FeaturedMovieCard from '../Movies/FeaturedMovieCard';
import { MagnifyingGlass, X } from '../Shared/Icon';
import Navbar from '../Shared/Navbar';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';

type HeaderProps = {
  movies: Movie[];
};

export default function Header({ movies }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const t = useTranslations('HomePage');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
      params.set('searchPage', '1');
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClearInput = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    router.push(`/?${params.toString()}`);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header>
      <div
        className="header-hero m-auto max-w-7xl md:aspect-[16/9]"
        style={{
          backgroundImage: `radial-gradient(circle, transparent, rgb(7, 7, 13) var(--fade-radius)), url(https://image.tmdb.org/t/p/w1280/${selectedMovie?.backdrop_path})`,
        }}
      >
        <Navbar />
        <div className="rotate-0 max-w-6xl m-auto p-4 flex flex-col gap-4 h-full md:pb-[200px]">
          <div className="flex sm:items-center gap-2">
            <div className="relative w-full max-w-64">
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleOnChange}
                  placeholder={t('searchInputPlaceholderText')}
                  className="w-full py-2 px-8 bg-blue-950/10 backdrop-blur-md border border-gray-700 text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />

                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200">
                  <MagnifyingGlass size={20} />
                </span>

                <span
                  data-testid="clear-input-button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
                  onClick={handleClearInput}
                >
                  {searchTerm && <X size={14} />}
                </span>
              </form>
            </div>
            <button
              onClick={handleSearch}
              className="py-2 px-4 bg-[#e94560] text-white rounded-full hover:bg-[#d13450] hover:cursor-pointer flex items-center gap-2"
            >
              {t('searchButtonLabel')}
            </button>
          </div>
          <div className="flex items-center h-full">
            <div className="flex flex-col md:max-w-1/2 gap-4">
              <h2
                className="text-[min(10vw,48px)] text-white font-bold leading-none
            "
              >
                {selectedMovie?.title}
              </h2>
              <p className="text-white break-words line-clamp-2">
                {selectedMovie?.overview}
              </p>
              <div className="flex gap-4">
                <button className="cursor-pointer text-white font-semibold bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full transition-colors">
                  {t('watchNowButtonLabel')}
                </button>
                <button className="cursor-pointer text-gray-300 hover:text-gray-200 font-semibold border-1 border-gray-300 hover:border-gray-200 py-2 px-4 rounded-full">
                  {t('moreInfoButtonLabel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-auto max-w-6xl p-4 md:mt-[-200px]">
        <h2 className="text-2xl text-white max-md:text-gray-800 dark:text-white font-bold mb-8">
          {t('headingTrending')}
        </h2>
        <div className="flex flex-nowrap p-4 gap-4 bg-blue-950/10 backdrop-blur-md border border-white/10 rounded-2xl featured-cards-shadow hidden-scrollbar overflow-auto">
          {movies.map((movie) => (
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
