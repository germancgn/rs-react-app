import { Component } from 'react';

type HeaderProps = {
  searchTerm: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default class Header extends Component<HeaderProps> {
  render() {
    const { searchTerm, onInputChange, onSearch } = this.props;

    return (
      <nav className="flex items-center justify-between p-4 backdrop-blur-md bg-white/10 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Movie Search</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={onInputChange}
            placeholder="Search movies..."
            className="w-64 p-2 pl-10 bg-white/20 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />
          <button
            onClick={onSearch}
            className="py-2 px-4 bg-[#e94560] text-white rounded-lg hover:bg-[#d13450]"
          >
            Search
          </button>
        </div>
      </nav>
    );
  }
}
