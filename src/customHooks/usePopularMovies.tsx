import { APP_CONSTANTS } from '@/app.constant';
import { useEffect, useState } from 'react';

type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type LatestMoviesType = {
  date: {
    maximum: Date;
    minimum: Date;
  };
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};

export const usePopularMovies = (url: string, method = 'GET') => {
  const [data, setData] = useState<LatestMoviesType | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('popular-movies');
    if (data) {
      setData(JSON.parse(data));
    } else {
      getLatestMovies();
    }
  }, []);

  async function getLatestMovies() {
    console.log(process.env.API_TOKEN, method);
    try {
      const options: RequestInit = {
        method,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      };

      const response = await fetch(`${APP_CONSTANTS.API_BASE_URL}${url}`, options);
      const data: LatestMoviesType = await response.json();
      localStorage.setItem('popular-movies', JSON.stringify(data));
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return data;
};
