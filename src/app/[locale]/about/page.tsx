import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Navbar from '../../../components/Shared/Navbar';
import { Link } from '../../../i18n/navigation';

export const metadata: Metadata = {
  title: 'About | React Movie Apps',
  description: 'Watch movies for free on React Movie App',
};

export default function About() {
  const t = useTranslations('AboutPage');
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <div className="flex flex-col max-w-6xl m-auto h-full items-center justify-between gap-4 p-4 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          {t('aboutHeading')}
        </h1>
        <p className="mb-2 text-gray-800 dark:text-gray-200">
          {t('aboutText')}
        </p>
        <p>
          {t('learnMoreAtText')}{' '}
          <Link
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:underline"
          >
            RS School React Course
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
