import { useAtom } from 'jotai';
import { Link, useNavigate } from 'react-router-dom';
import { isUserLoggedInAtom, userInfoAtom } from '@/store/global.atom.store';
import { signOutUser } from '@/service/auth';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isUserLoggedInAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);

  const signOutHandler = async () => {
    try {
      await signOutUser();
      setUserInfo(null);
      navigate('/login');
    } catch (error) {
      console.log('-->', error);
    }
  };
  return (
    <div className="absolute top-0 z-10 flex w-screen flex-col justify-between bg-gradient-to-b from-black px-8 py-2 md:flex-row">
      <Link to="/">
        <img className="w-44 sm:mx-0 md:mx-0" src="app-logo.png" alt="app-logo" />
      </Link>
      {isLoggedIn ? (
        <div
          role="presentation"
          onClick={signOutHandler}
          className="flex cursor-pointer flex-col items-center justify-center gap-1 p-2 text-sm font-bold text-white">
          <img className="hidden h-8 w-8 md:block" alt="user icon by Icons8" src="/user-icon.png" />
          <span>Sign Out</span>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex flex-col items-center justify-center gap-1 p-2 text-sm font-bold text-white">
          <img className="w-10" alt="login icon by Icons8" src="/login-icon.png" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
