import ErrorPage from '@/pages/Error.page';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@/pages/Home.page'),
    shouldRevalidate: () => false,
    children: [
      {
        index: true,
        lazy: () => import('@/pages/Movies.page')
      },
      {
        path: 'about',
        lazy: () => import('@/pages/About.page')
      },
      {
        path: 'login',
        lazy: () => import('@/pages/Login.page')
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ],
    errorElement: <ErrorPage />
  }
]);

// TODO: Above router object equivalent to JSX way
createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index lazy={() => import('./pages/Home.page')} />
    </Route>
  )
);

export default router;
