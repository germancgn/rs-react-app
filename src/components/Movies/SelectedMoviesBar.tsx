import { useState } from 'react';
import { useMovieStore } from '../../stores/movieStore';
import { objectToCSV } from '../../utils/csv/csv';
import {
  CaretDown,
  CaretUp,
  DownloadSimple,
  SelectionSlash,
} from '../Shared/Icon';
import { downloadCSV } from '../../utils/files/download';

export function SelectedMoviesBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { selected, remove, clear } = useMovieStore();

  if (selected.length === 0) return null;

  return (
    <div className="sticky bottom-0 w-full shadow-lg px-2 z-50">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-t-3xl border-t border-gray-700 px-4">
        <div className="flex justify-between items-center py-4 border-b border-gray-700">
          <div className="flex-1">
            <h3 className="text-[min(5vw,18px)] font-bold text-white">
              Selected Movies ({selected.length})
            </h3>
          </div>
          <div className="flex-1 flex justify-center">
            <button
              className="p-2 cursor-pointer transition rounded-full hover:bg-white/10"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? <CaretDown size={20} /> : <CaretUp size={20} />}
            </button>
          </div>
          <div className="flex-1 flex justify-end items-center space-x-4">
            <button
              onClick={() =>
                downloadCSV(
                  objectToCSV(selected, [
                    'id',
                    'title',
                    'adult',
                    'overview',
                    'popularity',
                    'poster_path',
                    'release_date',
                    'vote_average',
                    'vote_count',
                  ]),
                  `${selected.length}-movies.csv`
                )
              }
              className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-xs transition-colors"
            >
              <span>
                <DownloadSimple size={20} />
              </span>
              <span className="max-sm:hidden">Download CSV</span>
            </button>
            <button
              onClick={() => {
                setIsExpanded(true);
                clear();
              }}
              className="flex items-center gap-2 cursor-pointer bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-xs font-bold transition-colors"
            >
              <span>
                <SelectionSlash size={20} />
              </span>
              <span className="max-sm:hidden shrink-0">Unselect All</span>
            </button>
          </div>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded
              ? 'max-h-[30vh] mt-4 overflow-y-auto'
              : 'max-h-0 overflow-hidden'
          }`}
        >
          <ul className="pr-2">
            {selected.map((movie) => (
              <li
                key={movie.id}
                className="flex justify-between items-center hover:bg-gray-700 p-4 rounded-md"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
                        : '/images/image-not-found.jpg'
                    }
                    alt=""
                    className="w-10 h-10 bg-cover object-cover rounded"
                  />
                  <p className="text-gray-300 text-sm flex-1 truncate">
                    {movie.title}
                  </p>
                </div>
                <button
                  onClick={() => remove(movie.id)}
                  className="cursor-pointer text-red-500 hover:text-red-400 font-semibold text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
