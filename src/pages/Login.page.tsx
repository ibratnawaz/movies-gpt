import { APP_CONSTANTS } from '@/app.constant';
import Authenticator from '@/components/AuthenticatorHOC';
import { UserFormData, signInUser, signUpUser } from '@/service/auth';
import { userInfoAtom } from '@/store/global.atom.store';
import { atom, useAtom } from 'jotai';
import { useEffect, useRef, type BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const signingStatusAtom = atom(true);
const loadingStatusAtom = atom(false);
const errorAtom = atom<string | null>(null);

export function Component() {
  const navigate = useNavigate();
  const [, setUserInfo] = useAtom(userInfoAtom);

  const [isSigningIn, setIsSigningIn] = useAtom(signingStatusAtom);
  const [isLoading, setIsLoading] = useAtom(loadingStatusAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorAtom);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current as NodeJS.Timeout);
      setIsLoading(false);
      setIsSigningIn(true);
      setErrorMessage(null);
    };
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes(APP_CONSTANTS.FIREBASE_INVALID_DETAILS)) {
          setErrorMessage(APP_CONSTANTS.INVALID_CREDENTIALS);
        } else {
          setErrorMessage(error.message);
        }
      }
      timerRef.current = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Authenticator from="login">
      <Login
        isSigningIn={isSigningIn}
        submitFormHandler={submitFormHandler}
        errorMessage={errorMessage}
        isLoading={isLoading}
        setIsSigningIn={setIsSigningIn}
      />
    </Authenticator>
  );
}

type LoginProps = {
  isSigningIn: boolean;
  submitFormHandler: (e: BaseSyntheticEvent) => Promise<void>;
  errorMessage: string | null;
  isLoading: boolean;
  setIsSigningIn: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

type paraProps = {
  text: string;
  linkText: string;
  setIsSigningIn: (value: React.SetStateAction<boolean>) => void;
};

function Login(props: LoginProps) {
  const { isSigningIn, submitFormHandler, errorMessage, isLoading, setIsSigningIn } = props;
  return (
    <div className='relative h-screen w-screen bg-[url("/bg-login-banner.jpg")]'>
      <div className="h-screen w-screen bg-gray-950 opacity-60"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 mt-8 h-full w-full rounded-lg bg-black bg-opacity-80 p-12 text-white sm:m-auto md:h-fit md:w-3/12">
        <h1 data-testid="loginForm" className="py-4 font-sans text-3xl font-bold">
          {isSigningIn ? 'Sign In' : 'Sign Up'}
        </h1>
        <form onSubmit={submitFormHandler}>
          {!isSigningIn && (
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="my-4 w-full bg-zinc-800 p-4"
            />
          )}
          <input
            type="text"
            name="email"
            className="my-4 w-full bg-zinc-800 p-4"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            className="my-4 w-full bg-zinc-800 p-4"
            placeholder="password"
          />
          <p className="py-2 text-lg font-bold text-red-500">{errorMessage}</p>
          <button
            disabled={isLoading}
            className="my-6 w-full rounded-lg bg-red-700 p-4 disabled:opacity-75">
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

function CardFooter(props: paraProps) {
  const { text, linkText, setIsSigningIn } = props;

  return (
    <p className="py-4 text-sm tracking-wider text-gray-400">
      {text}
      <span
        role="presentation"
        className="ml-1 cursor-pointer underline"
        onClick={() => setIsSigningIn((status) => !status)}>
        {linkText}
      </span>
    </p>
  );
}
