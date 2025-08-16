'use client';

import { useEffect, useRef } from 'react';
import { useThemeContext } from '../../hooks/useTheme';
import { Moon, Sun } from './Icon';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeContext();
  const lightOnSound = useRef<HTMLAudioElement | null>(null);
  const lightOffSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    lightOnSound.current = new Audio('/sounds/light-on.mp3');
    lightOffSound.current = new Audio('/sounds/light-off.mp3');

    lightOnSound.current.load();
    lightOffSound.current.load();
  }, []);

  const handleToggle = () => {
    toggleTheme();

    const soundToPlay =
      theme === 'dark' ? lightOffSound.current : lightOnSound.current;

    if (soundToPlay) {
      soundToPlay.currentTime = 0;
      soundToPlay.play().catch((e) => {
        console.error('Failed to play toggle sound:', e);
      });
    }
  };

  return (
    <button onClick={handleToggle} className="cursor-pointer">
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
  );
}
