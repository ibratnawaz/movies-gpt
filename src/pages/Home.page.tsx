import Header from '@/components/Header';
import { getLatestMovies } from '@/service/movies-api';
import { Outlet } from 'react-router-dom';

export type LoaderProps = {
  request: Request;
  params: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export async function loader() {
  const data = await getLatestMovies();
  return data ?? [];
}

export function Component() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
