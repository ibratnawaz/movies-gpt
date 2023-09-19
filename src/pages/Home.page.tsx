import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export type LoaderProps = {
  request: Request;
  params: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export async function loader() {
  return null;
}

export function Component() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
