import { API_BASE, API_KEY } from "../config";

export async function fetchSeries() {
  const response = await fetch(
    `${API_BASE}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  if (!response.ok) throw new Error("Failed to fetch series");
  return response.json();
}
