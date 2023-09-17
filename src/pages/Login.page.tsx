import { atom, useAtom } from 'jotai';
import Header from '../components/Header';

const signingStatusAtom = atom(true);
const Login = () => {
  const [isSigningIn, setIsSigningIn] = useAtom(signingStatusAtom);

  return (
    <>
      <Header />
      <div className='w-screen h-screen relative bg-[url("bg-login-banner.jpg")]'>
        <div className="w-screen h-screen bg-gray-950 opacity-60"></div>
        <div className="w-full md:h-fit p-12 md:w-3/12 h-full absolute bg-black text-white rounded-lg bg-opacity-80 mt-8 sm:m-auto left-0 right-0 top-0 bottom-0">
          <h1 className="font-bold text-3xl py-4 font-sans">
            {isSigningIn ? 'Sign In' : 'Sign Up'}
          </h1>
          <form>
            <input type="text" className="p-4 my-4 w-full bg-zinc-800" placeholder="email" />
            <input type="password" className="p-4 my-4 w-full bg-zinc-800" placeholder="password" />
            <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
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
    </>
  );
};

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

export default Login;
