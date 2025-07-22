import { Spinner } from './Spinner';

type HeaderProps = {
  searchTerm: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
};

export default function Header({
  searchTerm,
  onInputChange,
  onSearch,
  isLoading,
}: HeaderProps) {
  return (
    <nav>
      <div className="header-hero m-auto max-w-6xl">
        <div className="flex flex-col m-auto container sm:flex-row items-center justify-between gap-4 p-4 rounded-lg">
          <h1 className="text-xl font-bold">Movie Search</h1>
          <div className="flex max-sm:w-full sm:items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={onInputChange}
              placeholder="Search movies..."
              className="w-full sm:w-64 p-2 bg-white/20 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e94560]"
            />
            <button
              onClick={onSearch}
              className="py-2 px-4 bg-[#e94560] text-white rounded-lg hover:bg-[#d13450] hover:cursor-pointer flex items-center gap-2"
              disabled={isLoading}
            >
              Search {isLoading && <Spinner size={16} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
