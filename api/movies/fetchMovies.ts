import { API_BASE, API_KEY } from "../config";

export async function fetchMovies() {
  const res = await fetch(`${API_BASE}/movie/popular?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}
