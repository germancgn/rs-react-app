import { Component } from 'react';

type HeaderProps = {
  searchTerm: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
};

export default class Header extends Component<HeaderProps> {
  render() {
    const { searchTerm, onInputChange, onSearch, isLoading } = this.props;

    return (
      <nav className="bg-white/10">
        <div className="flex flex-col container m-auto max-w-6xl sm:flex-row  items-center justify-between gap-4 p-4 rounded-lg">
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
              Search{' '}
              {isLoading && (
                <span className="spin-animation" data-testid="spinner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
