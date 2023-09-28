import { APP_CONSTANTS } from '@/app.constant';
import { useEffect, useState } from 'react';

type MovieVideoList = {
  id: number;
  results: MovieVideo[];
};

type MovieVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export const useVideo = (url: string, method = 'GET') => {
  const [data, setData] = useState<MovieVideo | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('banner-video');
    if (data) {
      setData(JSON.parse(data));
    } else {
      getMovieVideo();
    }
  }, []);

  async function getMovieVideo() {
    try {
      const options: RequestInit = {
        method,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      };

      const response = await fetch(`${APP_CONSTANTS.API_BASE_URL}${url}`, options);
      const data: MovieVideoList = await response.json();
      let banner = data.results.find((video) => video.type === 'Trailer');
      if (!banner) {
        banner = data.results[0];
      }
      localStorage.setItem('banner-video', JSON.stringify(banner));
      setData(banner);
    } catch (error) {
      console.log(error);
    }
  }

  return data;
};
