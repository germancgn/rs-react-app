'use client';

import { Link } from '../../i18n/navigation';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-6xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6 text-lg">
        Something went wrong. Please try again later.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded text-white transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
