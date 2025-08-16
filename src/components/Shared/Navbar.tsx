'use client';

import Link from 'next/link';
import { ThemeToggleButton } from './ThemeToggleButton';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col max-w-6xl m-auto sm:flex-row items-center justify-between gap-4 p-4 rounded-lg">
      <ul className="flex gap-8 w-full">
        <li>
          <Link
            href="/"
            className={`navlink-style` + (pathname === '/' ? ' active' : '')}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={
              `navlink-style` + (pathname === '/about' ? ' active' : '')
            }
          >
            About
          </Link>
        </li>

        <li className="ml-auto navlink-style">
          <ThemeToggleButton />
        </li>
        <li>
          <Link
            href="/signin"
            className={
              `navlink-style` + (pathname === '/signin' ? ' active' : '')
            }
          >
            Sign in
          </Link>
        </li>
      </ul>
    </nav>
  );
}
