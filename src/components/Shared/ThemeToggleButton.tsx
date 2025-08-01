import { useEffect } from 'react';
import { useThemeContext } from '../../hooks/useTheme';
import { Moon, Sun } from './Icon';

const lightOnSound = new Audio('/sounds/light-on.mp3');
const lightOffSound = new Audio('/sounds/light-off.mp3');

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeContext();

  useEffect(() => {
    lightOnSound.load();
    lightOffSound.load();
  }, []);

  function handleToggle() {
    const sound = theme === 'dark' ? lightOffSound : lightOnSound;

    sound.currentTime = 0;
    sound.play().catch((e) => {
      console.error('Failed to play toggle sound:', e);
    });

    toggleTheme();
  }

  return (
    <button
      onClick={handleToggle}
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
  );
}
