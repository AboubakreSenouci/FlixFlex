import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchSeriesDetails(seriesId: number) {
  const response = await fetch(
    `${API_BASE}/tv/${seriesId}?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error("Failed to fetch series details");
  return response.json();
}

export function useSeriesDetails(seriesId: number) {
  return useQuery({
    queryKey: ["series", seriesId],
    queryFn: () => fetchSeriesDetails(seriesId),
    enabled: !!seriesId,
  });
}
