/* eslint-disable camelcase */
import { usePopularMovies } from '@/customHooks/usePopularMovies';
import { useVideo } from '@/customHooks/useVideo';

export function Component() {
  const movies = usePopularMovies(
    '/now_playing?include_adult=true&include_video=true&sort_by=popularity.desc&page=1'
  );

  if (!movies) {
    return <h1>Loading...</h1>;
  }
  const { id, original_title, overview } = movies.results[2];

  return (
    <div className="   bg-black md:pt-0 h-[100%]">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
}

type PropsTypeBg = {
  movieId: number;
};

function VideoBackground({ movieId }: PropsTypeBg) {
  const movie = useVideo(`/${movieId}/videos?language=en-US`);

  return (
    <div className=" w-screen">
      <iframe
        className="w-[100%] aspect-video md:absolute md:top-[-110px]"
        src={`https://www.youtube.com/embed/${movie?.key}?&autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
  );
}

type PropsTypeTitle = {
  title: string;
  overview: string;
};

function VideoTitle({ overview, title }: PropsTypeTitle) {
  return (
    <div className="w-[100%] h-[100%] z-10 aspect-video pt-[18%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold mb-4 lg:mb-0">{title}</h1>
      {/* <div className="hidden lg:inline-block"> */}
      <p className="hidden lg:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0 flex">
        <button className="flex items-center gap-2 bg-white text-black py-1 md:py-2 px-3 md:px-6 text-sm font-semibold  rounded-sm hover:bg-opacity-80">
          <img width={20} src="/play-icon.png" alt="play icon by Icons8" /> Play
        </button>
        <button className="flex items-center gap-2 mx-2 bg-gray-500 text-white text-sm font-semibold p-2 px-6 bg-opacity-50 rounded-sm">
          <img width={20} src="/info-icon-light.png" alt="play icon by Icons8" />
          <span>More Info</span>
        </button>
      </div>
      {/* </div> */}
    </div>
  );
}
