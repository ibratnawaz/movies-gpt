import { createBrowserRouter } from 'react-router-dom';
import About from './pages/About.page';
import Login from './pages/Login.page';
import ErrorPage from './pages/Error.page';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      }
    ],
    errorElement: <ErrorPage />
  }
]);

export default router;
