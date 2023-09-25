import { useMemo } from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

function errorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return error;
  } else if (error instanceof Error) {
    return error;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return '';
  }
}

function ErrorPage() {
  const error = useRouteError();
  const properError = useMemo(() => errorMessage(error), [error]);

  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center px-4 font-sans">
      <div className="font-sans text-3xl italic tracking-wide text-gray-400">
        {!properError ? (
          <p>Sorry, the page you are looking doesn&apos;t exists.</p>
        ) : (
          <>
            <h1>Error Trace-</h1>
            <code className="text-lg">{properError instanceof Error && properError.stack}</code>
            <Link
              to="/"
              className="mt-4 block w-32 rounded border border-black bg-gray-700 p-2 text-center text-lg text-white">
              Go Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
