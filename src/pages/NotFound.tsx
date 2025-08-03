import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="mb-6 text-lg">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded text-white transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
