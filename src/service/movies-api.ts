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

export async function getLatestMovies() {
  console.log(process.env.API_TOKEN);
  try {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODM1ZGJlZTU1MDlhZmIyNzZmMzBkYTkwYTczNmZlMiIsInN1YiI6IjY1MTEyNTBjYTkxMTdmMDBhYjY5ODlmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AIS5V2eVrKuopE2gvBywroJks-IavjG695B_qckG7pk'
      }
    };

    const response = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      options
    );
    const data: LatestMoviesType = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
