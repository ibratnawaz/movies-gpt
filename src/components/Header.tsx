import { useAtom } from 'jotai';
import { countAtom } from '../store/global.atom.store';

const Header = () => {
  const [count, setCount] = useAtom(countAtom);
  console.log('rendered', count);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 md:mx-0 sm:mx-0" src="app-logo.png" alt="app-logo" />
      <button
        type="button"
        className="p-4 my-6 bg-red-700 w-full rounded-lg"
        onClick={() => {
          setCount((count: number) => count + 1);
        }}>
        Count- {count}
      </button>
    </div>
  );
};

export default Header;
