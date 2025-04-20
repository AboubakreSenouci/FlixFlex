import { useInfiniteQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchSeries(page: number) {
  const response = await fetch(
    `${API_BASE}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) throw new Error("Failed to fetch series");
  return response.json();
}

export function useSeries() {
  return useInfiniteQuery({
    queryKey: ["series", "popular"],
    queryFn: ({ pageParam = 1 }) => fetchSeries(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.page < lastPage?.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
}
