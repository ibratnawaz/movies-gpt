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
        <div className="flex p-2 justify-between">
          <img className="hidden md:block w-10 h-10 mr-2" alt="usericon" src="/user-icon.png" />
          <button onClick={signOutHandler} className="font-bold text-white text-sm">
            (Sign Out)
          </button>
        </div>
      ) : (
        <Link to="/login" className="mt-5 font-bold text-white text-sm">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Header;
