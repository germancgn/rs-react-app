import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex flex-col max-w-6xl m-auto sm:flex-row items-center justify-between gap-4 p-4 rounded-lg">
      <ul className="flex gap-8 w-full">
        <li className="hover:text-white">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-white">
          <Link to="/about">About</Link>
        </li>

        <li className="ml-auto hover:text-white">
          <a href="">Sign in</a>
        </li>
      </ul>
    </nav>
  );
}
