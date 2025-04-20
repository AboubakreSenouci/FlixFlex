import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchSeriesVideos(seriesId: number) {
  const response = await fetch(
    `${API_BASE}/tv/${seriesId}/videos?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error("Failed to fetch series videos");
  return response.json();
}

export function useSeriesVideos(seriesId: number) {
  return useQuery({
    queryKey: ["series", seriesId, "videos"],
    queryFn: () => fetchSeriesVideos(seriesId),
    enabled: !!seriesId,
    select: (data) => {
      return data.results?.find(
        (video: any) =>
          video.type === "Trailer" && video.official && video.site === "YouTube"
      );
    },
  });
}
