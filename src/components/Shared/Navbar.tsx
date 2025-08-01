import { NavLink } from 'react-router-dom';
import { Moon, Sun } from './Icon';
import { useThemeContext } from '../../hooks/useTheme';

export default function Navbar() {
  const { theme, toggleTheme } = useThemeContext();

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
          <button
            onClick={toggleTheme}
            className="cursor-pointer text-gray-400 hover:text-white"
          >
            <div className="relative w-6 h-6">
              <div
                className={`absolute inset-0 transition-all duration-300 transform ${
                  theme === 'dark'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4'
                }`}
              >
                <Moon size={24} />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-300 transform ${
                  theme === 'light'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <Sun size={24} />
              </div>
            </div>
          </button>
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
