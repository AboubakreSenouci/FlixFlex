import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function searchMovies(query: string) {
  if (!query.trim()) return [];

  const res = await fetch(
    `${API_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&include_adult=false`
  );

  if (!res.ok) throw new Error("Failed to search movies");

  const data = await res.json();
  return data.results;
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
  });
}
