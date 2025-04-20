import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchSeries() {
  const response = await fetch(
    `${API_BASE}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  if (!response.ok) throw new Error("Failed to fetch series");
  return response.json();
}

export function useSeries() {
  return useQuery({
    queryKey: ["series", "popular"],
    queryFn: fetchSeries,
  });
}
