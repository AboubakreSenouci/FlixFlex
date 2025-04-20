import Constants from "expo-constants";

const API_BASE = Constants.expoConfig?.extra?.TMDB_BASE_URL;
const API_KEY = Constants.expoConfig?.extra?.TMDB_API_KEY;

export async function fetchMovies() {
  const res = await fetch(`${API_BASE}/movie/popular?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function fetchTopRated(type: "movie" | "tv") {
  const res = await fetch(
    `${API_BASE}/${type}/top_rated?api_key=${API_KEY}&page=1`
  );
  if (!res.ok) throw new Error("Failed to fetch top rated");
  const data = await res.json();
  return {
    ...data,
    results: data.results.slice(0, 5),
  };
}

export const fetchMovieDetails = async (movieId: number) => {
  const response = await fetch(
    `${API_BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return response.json();
};

export const fetchMovieVideos = async (movieId: number) => {
  const response = await fetch(
    `${API_BASE}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  return response.json();
};

export const fetchSeries = async () => {
  const response = await fetch(
    `${API_BASE}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.json();
};

export const fetchSeriesDetails = async (seriesId: number) => {
  const response = await fetch(
    `${API_BASE}/tv/${seriesId}?api_key=${API_KEY}&language=en-US`
  );
  return response.json();
};

export const fetchSeriesVideos = async (seriesId: number) => {
  const response = await fetch(
    `${API_BASE}/tv/${seriesId}/videos?api_key=${API_KEY}&language=en-US`
  );
  return response.json();
};
