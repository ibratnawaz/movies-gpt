import { useAtom } from 'jotai';
import { useEffect, type ReactElement } from 'react';
import { isUserLoggedInAtom } from '@/store/global.atom.store';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  from: string;
  children?: ReactElement;
};

const AuthenticatorHOC = ({ from = '', children }: PropsType): ReactElement => {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isUserLoggedInAtom);

  useEffect(() => {
    if (isLoggedIn && from == 'login') {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  if (!children) return <></>;

  return { ...children };
};

export default AuthenticatorHOC;
