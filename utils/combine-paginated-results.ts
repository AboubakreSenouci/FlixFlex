export const combinePaginatedResults = (data: any) => {
  if (!data || !Array.isArray(data.pages)) return [];

  return data.pages.flatMap((page: any) => page.results || []);
};
