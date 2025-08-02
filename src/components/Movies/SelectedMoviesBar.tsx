import { useState } from 'react';
import { useMovieStore } from '../../stores/movieStore';
import { objectToCSV } from '../../utils/csv/csv';
import { downloadCSV } from '../../utils/files/download';

export function SelectedMoviesBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { selected, remove, clear } = useMovieStore();

  if (selected.length === 0) return null;

  return (
    <div className="sticky bottom-0 w-full shadow-lg px-4 z-50">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-t-3xl border-t border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center px-4 py-2">
          <h3 className="text-lg font-bold text-white">
            Selected Movies ({selected.length})
          </h3>
          <button
            className="p-2 cursor-pointer transition rounded-full hover:bg-white/10"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? <CaretDown size={20} /> : <CaretUp size={20} />}
          </button>
          <div className="flex items-center space-x-4">
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
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors"
            >
              Download CSV
            </button>
            <button
              onClick={() => {
                setIsExpanded(true);
                clear();
              }}
              className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors"
            >
              Unselect All
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
                <span className="text-gray-300 text-sm">{movie.title}</span>
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
