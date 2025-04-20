import { useInfiniteQuery } from "@tanstack/react-query";
import { API_BASE, API_KEY } from "../config";

async function fetchMovies(page: number) {
  const res = await fetch(
    `${API_BASE}/movie/popular?page=${page}&api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export function useMovies() {
  return useInfiniteQuery({
    queryKey: ["movies", "popular"],
    queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam),
    defaultPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.page < lastPage?.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
}
