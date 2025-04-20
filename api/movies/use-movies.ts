import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchMovies() {
  const res = await fetch(`${API_BASE}/movie/popular?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export function useMovies() {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: fetchMovies,
  });
}
