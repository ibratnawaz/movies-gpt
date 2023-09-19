import { useRef, useEffect, type BaseSyntheticEvent } from 'react';
import { atom, useAtom } from 'jotai';
import { UserFormData, signInUser, signUpUser } from '../service/auth';
import { isUserLoggedInAtom, userInfoAtom } from '../store/global.atom.store';
import { useNavigate } from 'react-router-dom';
import { APP_CONSTANTS } from '../app.constant';

const signingStatusAtom = atom(true);
const loadingStatusAtom = atom(false);
const errorAtom = atom<string | null>(null);

export function Component() {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isUserLoggedInAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);

  const [isSigningIn, setIsSigningIn] = useAtom(signingStatusAtom);
  const [isLoading, setIsLoading] = useAtom(loadingStatusAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorAtom);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/about');
    }

    return () => {
      clearTimeout(timerRef.current as NodeJS.Timeout);
      setIsLoading(false);
      setIsSigningIn(true);
      setErrorMessage(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitFormHandler = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const user: UserFormData = {
      username: formData.get('username')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? ''
    };

    try {
      if (isSigningIn) {
        const resp = await signInUser(user);
        setUserInfo(resp);
      } else {
        const resp = await signUpUser(user);
        setUserInfo(resp);
      }
      navigate('/about');
      // eslint-disable-next-line
    } catch (error: any) {
      if (error.message.includes(APP_CONSTANTS.FIREBASE_INVALID_DETAILS)) {
        setErrorMessage(APP_CONSTANTS.INVALID_CREDENTIALS);
      } else {
        setErrorMessage(error.message);
      }
      timerRef.current = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen relative bg-[url("/bg-login-banner.jpg")]'>
      <div className="w-screen h-screen bg-gray-950 opacity-60"></div>
      <div className="w-full md:h-fit p-12 md:w-3/12 h-full absolute bg-black text-white rounded-lg bg-opacity-80 mt-8 sm:m-auto left-0 right-0 top-0 bottom-0">
        <h1 className="font-bold text-3xl py-4 font-sans">{isSigningIn ? 'Sign In' : 'Sign Up'}</h1>
        <form onSubmit={submitFormHandler}>
          {!isSigningIn && (
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-zinc-800"
            />
          )}
          <input
            type="text"
            name="email"
            className="p-4 my-4 w-full bg-zinc-800"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            className="p-4 my-4 w-full bg-zinc-800"
            placeholder="password"
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button disabled={isLoading} className="p-4 my-6 bg-red-700 w-full rounded-lg">
            {isSigningIn ? 'Sign In' : 'Sign Up'}
          </button>
          {isSigningIn ? (
            <CardFooter
              text="New to Netflix?"
              linkText="Sign Up Now."
              setIsSigningIn={setIsSigningIn}
            />
          ) : (
            <CardFooter
              text="Already an existing member?"
              linkText="Login Now."
              setIsSigningIn={setIsSigningIn}
            />
          )}
        </form>
      </div>
    </div>
  );
}

type paraProps = {
  text: string;
  linkText: string;
  setIsSigningIn: (value: React.SetStateAction<boolean>) => void;
};

function CardFooter(props: paraProps) {
  const { text, linkText, setIsSigningIn } = props;

  return (
    <p className="py-4 text-gray-400 tracking-wider text-sm">
      {text}
      <span
        role="presentation"
        className="underline cursor-pointer ml-1"
        onClick={() => setIsSigningIn((status) => !status)}>
        {linkText}
      </span>
    </p>
  );
}
