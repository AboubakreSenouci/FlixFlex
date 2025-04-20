import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchTopRatedMovies() {
  const res = await fetch(
    `${API_BASE}/movie/top_rated?api_key=${API_KEY}&page=1`
  );
  if (!res.ok) throw new Error("Failed to fetch top rated movies");
  const data = await res.json();
  return {
    ...data,
    results: data.results.slice(0, 5),
  };
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ["movies", "top-rated"],
    queryFn: fetchTopRatedMovies,
    select: (data) => data.results
  });
}
