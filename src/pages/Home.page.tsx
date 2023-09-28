import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export function Component() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
