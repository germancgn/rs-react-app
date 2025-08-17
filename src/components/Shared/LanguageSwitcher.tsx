'use client';

import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { redirect, usePathname } from '../../i18n/navigation';
import { Globe } from './Icon';

type Locale = {
  code: string;
  label: string;
};

const locales = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'de', label: 'Deutsch' },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currLocale = useLocale();
  const [showMenu, setShowMenu] = useState(false);
  const togglerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleLocaleChange = (locale: Locale) => {
    redirect({
      href: pathname,
      locale: locale.code,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        togglerRef.current &&
        !togglerRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={togglerRef}>
      <button onClick={toggleMenu} className="navlink language-switcher-button">
        <Globe size={18} />
        <span className="inline-flex leading-0">{currLocale}</span>
      </button>

      <ul
        className={`language-switcher-menu ${
          showMenu
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {locales
          .filter((locale) => locale.code !== currLocale)
          .map((locale, i) => (
            <li
              className="text-gray-200 hover:text-white cursor-pointer py-1 px-2 hover:bg-white/10 rounded select-none"
              key={i}
              onClick={() => handleLocaleChange(locale)}
            >
              {locale.label}
            </li>
          ))}
      </ul>
    </div>
  );
}
