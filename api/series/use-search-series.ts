import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function searchSeries(query: string) {
  if (!query.trim()) return [];

  const res = await fetch(
    `${API_BASE}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&include_adult=false`
  );

  if (!res.ok) throw new Error("Failed to search TV series");

  const data = await res.json();
  return data.results;
}

export function useSearchSeries(query: string) {
  return useQuery({
    queryKey: ["series", "search", query],
    queryFn: () => searchSeries(query),
  });
}
