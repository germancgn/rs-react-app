import Navbar from '../components/Shared/Navbar';

export default function About() {
  return (
    <div className="h-full">
      <Navbar />
      <div className="flex flex-col max-w-6xl m-auto h-full items-center justify-between gap-4 p-4 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">About This App</h1>
        <p className="mb-2">
          This application was developed by German, a junior web developer, as
          part of the RS School React course.
        </p>
        <p>
          Learn more about the course at{' '}
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:underline"
          >
            RS School React Course
          </a>
          .
        </p>
      </div>
    </div>
  );
}
