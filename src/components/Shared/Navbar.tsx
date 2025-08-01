import { NavLink } from 'react-router-dom';
import { ThemeToggleButton } from './ThemeToggleButton';

export default function Navbar() {
  return (
    <nav className="flex flex-col max-w-6xl m-auto sm:flex-row items-center justify-between gap-4 p-4 rounded-lg">
      <ul className="flex gap-8 w-full">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-white' : 'text-gray-400 hover:text-white'
            }
          >
            About
          </NavLink>
        </li>

        <li className="ml-auto">
          <ThemeToggleButton />
        </li>
        <li>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? 'text-white' : 'text-gray-400 hover:text-white'
            }
          >
            Sign in
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
