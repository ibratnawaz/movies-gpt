import { useRouteError, Link } from 'react-router-dom';

function ErrorPage() {
  const error: any = useRouteError(); // eslint-disable-line
  console.log(error);
  return (
    <div className="container mx-auto px-4 font-sans flex flex-col justify-center h-screen items-center">
      <div className="font-sans text-3xl text-gray-400 italic tracking-wide">
        {!error ? (
          <p>Sorry, the page you are looking doesn&apos;t exists.</p>
        ) : (
          <>
            <h1>Error Trace-</h1>
            <code className="text-lg">{error?.stack}</code>
            <Link
              to="/"
              className="block w-32 text-center mt-4 text-lg border border-black rounded bg-gray-700 text-white p-2">
              Go Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
