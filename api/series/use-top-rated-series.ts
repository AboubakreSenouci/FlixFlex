import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchTopRatedSeries() {
  const res = await fetch(`${API_BASE}/tv/top_rated?api_key=${API_KEY}&page=1`);
  if (!res.ok) throw new Error("Failed to fetch top rated series");
  const data = await res.json();
  return {
    ...data,
    results: data.results.slice(0, 5),
  };
}

export function useTopRatedSeries() {
  return useQuery({
    queryKey: ["series", "top-rated"],
    queryFn: fetchTopRatedSeries,
  });
}
