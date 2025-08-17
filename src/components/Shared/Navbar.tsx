'use client';

import { ThemeToggleButton } from './ThemeToggleButton';
import { useTranslations } from 'next-intl';
import { usePathname, Link } from '../../i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations('NavBar');

  return (
    <nav className="flex flex-col max-w-6xl m-auto sm:flex-row items-center justify-between gap-4 p-4 rounded-lg">
      <ul className="flex gap-8 w-full items-center">
        <li>
          <Link
            href="/"
            className={`navlink` + (pathname === '/' ? ' active' : '')}
          >
            {t('homeLinkLabel')}
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`navlink` + (pathname === '/about' ? ' active' : '')}
          >
            {t('aboutLinkLabel')}
          </Link>
        </li>

        <li className="ml-auto">
          <LanguageSwitcher />
        </li>
        <li className="navlink">
          <ThemeToggleButton />
        </li>
        <li>
          <Link
            href="/signin"
            className={`navlink` + (pathname === '/signin' ? ' active' : '')}
          >
            {t('signInLinkLabel')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
