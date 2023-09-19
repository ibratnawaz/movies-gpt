import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { isUserLoggedInAtom } from '../store/global.atom.store';
import { useNavigate } from 'react-router-dom';

export const AuthenticatorHOC = (WrappedComponent: () => JSX.Element, from = '') => {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isUserLoggedInAtom);

  useEffect(() => {
    if (isLoggedIn && from == 'login') {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthenticatedComponent = (props: any) => <WrappedComponent {...props} />;

  return AuthenticatedComponent;
};
