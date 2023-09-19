import { useAtom } from 'jotai';
import { Link, useNavigate } from 'react-router-dom';
import { isUserLoggedInAtom, userInfoAtom } from '../store/global.atom.store';
import { signOutUser } from '../service/auth';

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
    <div className="absolute top-0 w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <Link to="/">
        <img className="w-44 md:mx-0 sm:mx-0" src="app-logo.png" alt="app-logo" />
      </Link>
      {isLoggedIn ? (
        <div
          role="presentation"
          onClick={signOutHandler}
          className="font-bold text-white text-sm p-2 flex justify-center items-center flex-col gap-1 cursor-pointer">
          <img className="hidden md:block w-8 h-8" alt="user icon by Icons8" src="/user-icon.png" />
          <span>Sign Out</span>
        </div>
      ) : (
        <Link
          to="/login"
          className="font-bold text-white text-sm p-2 flex justify-center items-center flex-col gap-1">
          <img className="w-10" alt="login icon by Icons8" src="/login-icon.png" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
