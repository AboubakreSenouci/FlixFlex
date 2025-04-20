import { API_BASE, API_KEY } from "../config";

export async function fetchSeriesVideos(seriesId: number) {
  const response = await fetch(
    `${API_BASE}/tv/${seriesId}/videos?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error("Failed to fetch series videos");
  return response.json();
}
