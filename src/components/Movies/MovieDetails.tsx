import { CheckCircleSolid, PlusCircle, X } from '../Shared/Icon';
import { useMovieStore } from '../../stores/movieStore';
import { useGetMovieById } from '../../queries/useGetMovieById';
import Image from 'next/image';
import NotFoundImage from '../../../public/images/image-not-found.jpg';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';

function MovieDetailsSkeleton() {
  return (
    <div
      data-testid="movie-details-skeleton"
      className="bg-white dark:bg-gray-900 text-white rounded-lg sticky top-4"
    >
      <div className="p-4 flex flex-col md:flex-row gap-8 animate-pulse w-full">
        <div className="max-w-[200px] w-full aspect-2/3 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />
            <div className="h-20 w-full bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="flex flex-wrap gap-4 text-sm text-gray-200">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-200 dark:bg-gray-600 h-8 w-24 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function XButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (!searchParams) return null;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      onClick={handleClick}
      className=" text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition cursor-pointer p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
    >
      <span>
        <X size={24} />
      </span>
    </button>
  );
}

export default function MovieDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('details');
  if (!id) throw new Error("MovieDetails: missing required route param 'id'.");
  const t = useTranslations('MovieDetails');

  const { add, remove, hasItem } = useMovieStore();
  const { data, error, isFetching, refetch } = useGetMovieById(id);

  return (
    <div className="max-md:fixed w-full max-md:h-full max-md:inset-0 flex flex-col max-md:justify-center max-md:p-4 z-50 relative">
      <div className="hidden max-md:block absolute inset-0 bg-black/70"></div>
      {error ? (
        <div className="max-w-full p-4 h-fit flex flex-col gap-6 bg-white dark:bg-gray-900 text-white rounded-lg sticky top-4">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('couldNotLoadMovieDetailsHeading')}
            </h1>
            <XButton />
          </div>
          <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
          <div className="self-end">
            <button
              onClick={() => refetch()}
              className="py-2 px-4 bg-[#e94560] text-white rounded-full hover:bg-[#d13450] hover:cursor-pointer flex items-center gap-2 disabled:opacity-60"
              disabled={isFetching}
            >
              Retry
            </button>
          </div>
        </div>
      ) : isFetching || !data ? (
        <MovieDetailsSkeleton />
      ) : (
        <div className="max-w-fit p-4 h-fit flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-900 text-white rounded-lg sticky top-4">
          <Image
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                : NotFoundImage.src
            }
            width={500}
            height={750}
            alt={`${data.title}`}
            className="max-w-[200px] aspect-2/3 rounded-lg object-cover"
          />
          <div className="flex flex-col justify-around gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {data.title}
                </h1>
                <XButton />
              </div>

              <p className="italic text-gray-400 dark:text-gray-600">
                {data.tagline || 'No tagline available'}
              </p>

              <p className="text-gray-600 dark:text-gray-200">
                {data.overview || 'No overview available.'}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span>
                  <strong>{t('releaseText')}:</strong>{' '}
                  {data.release_date || 'N/A'}
                </span>
                <span>
                  <strong>{t('runtimeText')}:</strong>{' '}
                  {data.runtime ? `${data.runtime} min` : 'N/A'}
                </span>
                <span data-testid="movie-details-genres">
                  <strong>{t('genresText')}:</strong>{' '}
                  {data.genres && data.genres.length > 0
                    ? data.genres.map((g) => g.name).join(', ')
                    : 'N/A'}
                </span>
                <span data-testid="movie-details-rating">
                  <strong>{t('ratingText')}:</strong>{' '}
                  {data.vote_average ? `${data.vote_average} / 10` : 'N/A'}
                </span>
              </div>
            </div>
            <div className="self-end flex items-center gap-4">
              <button
                onClick={() => refetch()}
                className="flex items-center gap-2 py-2 px-4 text-sm rounded-full border text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 border-gray-600 dark:border-gray-400 hover:border-gray-800 dark:hover:border-gray-200 cursor-pointer transition-colors"
              >
                {t('refetchButtonLabel')}
              </button>
              {hasItem(data.id) ? (
                <button
                  onClick={() => remove(data.id)}
                  className="flex items-center gap-2 py-2 px-4 text-sm rounded-full border border-sky-500 hover:bg-sky-400 cursor-pointer bg-sky-500"
                >
                  <span>{t('selectedMovieButtonLabel')}</span>
                  <span>
                    <CheckCircleSolid size={18} />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    add({
                      ...data,
                      media_type: 'movie',
                      genre_ids: [],
                    })
                  }
                  className="flex items-center gap-2 py-2 px-4 text-sm rounded-full border text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 border-gray-600 dark:border-gray-400 hover:border-gray-800 dark:hover:border-gray-200 cursor-pointer transition-colors"
                >
                  <span>{t('selectMovieButtonLabel')}</span>
                  <span>
                    <PlusCircle size={18} />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
