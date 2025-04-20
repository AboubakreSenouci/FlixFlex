import { useQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchMovieVideos(movieId: number) {
  const response = await fetch(
    `${API_BASE}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error("Failed to fetch movie videos");
  return response.json();
}

export function useMovieVideos(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId, "videos"],
    queryFn: () => fetchMovieVideos(movieId),
    enabled: !!movieId,
  });
}
