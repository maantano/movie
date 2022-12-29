export const API_Key = 'fea2b17df637d4f3a55228d4c0ef6c3d';
export const BASE_URL = 'https://api.themoviedb.org/3';

export const NOWPLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_Key}&language=en-US&page=1&region=KR`;

export const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_Key}&language=en-US&page=1`;
export const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_Key}`;
// export const BASE_URL = `https://image.tmdb.org/t/p/`;

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}
export interface TVResponse extends BaseResponse {
  results: TV[];
}

export const makeImgPath = (img: string, width: string = 'w500') =>
  `https://image.tmdb.org/t/p/${width}${img}`;

// export const trending = () =>
//   fetch(`${BASE_URL}/trending/movie/week?api_key=${API_Key}`).then(res =>
//     res.json(),
//   );

// export const upcoming = () =>
//   fetch(
//     `${BASE_URL}/movie/upcoming?api_key=${API_Key}&language=en-US&page=1`,
//   ).then(res => res.json());

// export const nowPlaying = () =>
//   fetch(
//     `${BASE_URL}/movie/now_playing?api_key=${API_Key}&language=en-US&page=1&region=KR`,
//   ).then(res => res.json());

// export const moviesApi = {trending, upcoming, nowPlaying};

// 아래처럼 바꿀수 있다.

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_Key}`).then(res =>
      res.json(),
    ),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_Key}&language=en-US&page=1`,
    ).then(res => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_Key}&language=en-US&page=1&region=KR`,
    ).then(res => res.json()),
  search: ({info, queryKey}) => {
    // console.log(info);
    const [_, query] = queryKey;
    // console.log(_);
    // console.log(query);
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_Key}&language=en-US&page=1&region=KR&query=${query}`,
    ).then(res => res.json());
  },
  detail: ({queryKey}) => {
    const [_, id] = queryKey;

    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_Key}&append_to_response=videos,images`,
    ).then(res => res.json());
  },
  similar: ({queryKey}) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}/similar?api_key=${API_Key}&language=en-US&page=1&region=KR`,
    ).then(res => res.json());
  },
};

// export const tvApi = {
//   trending: () =>
//     fetch(`${BASE_URL}/trending/tv/week?api_key=${API_Key}`).then(res =>
//       res.json(),
//     ),
//   airingToday: () =>
//     fetch(
//       `${BASE_URL}/tv/airing_today?api_key=${API_Key}&language=en-US&page=1`,
//     ).then(res => res.json()),
//   topRated: () =>
//     fetch(
//       `${BASE_URL}/tv/top_rated?api_key=${API_Key}&language=en-US&page=1&region=KR`,
//     ).then(res => res.json()),
// };

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_Key}`).then(res =>
      res.json(),
    ),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_Key}`).then(res =>
      res.json(),
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_Key}`).then(res =>
      res.json(),
    ),
  search: ({info, queryKey}) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_Key}&language=en-US&page=1&region=KR&query=${query}`,
    ).then(res => res.json());
  },
  detail: ({queryKey}) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_Key}&append_to_response=videos,images`,
    ).then(res => res.json());
  },
  similar: ({queryKey}) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}/similar?api_key=${API_Key}&language=en-US&page=1&region=KR`,
    ).then(res => res.json());
  },
};
