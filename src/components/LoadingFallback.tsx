import Spinner from './Spinner';

type LoadingFallbackProps = {
  title: string;
};

export default function LoadingFallback({ title }: LoadingFallbackProps) {
  return (
    <div className="flex justify-center gap-4 items-center min-h-64">
      <div className="flex flex-col bg-white/5 rounded-2xl py-6 px-4 items-center gap-16">
        <h3 className="text-2xl font-bold text-gray-200 animate-pulse">
          {title}
        </h3>
        <span className="text-gray-400 animate-pulse">
          <Spinner size={64} />
        </span>
      </div>
    </div>
  );
}
