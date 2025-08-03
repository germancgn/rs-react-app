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
              'navlink-style' + (isActive ? ' active' : '')
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              'navlink-style' + (isActive ? ' active' : '')
            }
          >
            About
          </NavLink>
        </li>

        <li className="ml-auto navlink-style">
          <ThemeToggleButton />
        </li>
        <li>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              'navlink-style' + (isActive ? ' active' : '')
            }
          >
            Sign in
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
