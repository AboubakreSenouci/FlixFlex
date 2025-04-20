import { API_BASE, API_KEY } from "../config";

export async function fetchMovieDetails(movieId: number) {
  const response = await fetch(
    `${API_BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error("Failed to fetch movie details");
  return response.json();
}
