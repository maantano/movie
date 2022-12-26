export const API_Key = 'fea2b17df637d4f3a55228d4c0ef6c3d';
export const BASE_URL = 'https://api.themoviedb.org/3';

export const NOWPLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_Key}&language=en-US&page=1&region=KR`;

export const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_Key}&language=en-US&page=1`;
export const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_Key}`;
// export const BASE_URL = `https://image.tmdb.org/t/p/`;

export const makeImgPath = (img: string, width: string = 'w500') =>
  `https://image.tmdb.org/t/p/${width}${img}`;

export const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_Key}`).then(res =>
    res.json(),
  );

export const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_Key}&language=en-US&page=1`,
  ).then(res => res.json());

export const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_Key}&language=en-US&page=1&region=KR`,
  ).then(res => res.json());

export const moviesApi = {trending, upcoming, nowPlaying};
