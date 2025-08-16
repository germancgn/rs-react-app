'use client';

import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { redirect, usePathname } from '../../i18n/navigation';

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
      <span
        onClick={toggleMenu}
        className="navlink py-1 px-2 hover:bg-white/20 border-1 border-white/10 rounded-sm cursor-pointer transition-colors select-none"
      >
        {locales.find((locale) => locale.code === currLocale)?.label ??
          'Language'}
      </span>

      <ul
        className={`absolute right-0 z-10 mt-1.5 border-1 border-white/10 bg-white/20 shadow-xs p-1 rounded-sm transform transition-all duration-200 ease-out ${
          showMenu
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {locales
          .filter((locale) => locale.code !== currLocale)
          .map((locale, i) => (
            <li
              className="text-gray-200 hover:text-white cursor-pointer py-1 px-2 hover:bg-white/30 rounded select-none"
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
