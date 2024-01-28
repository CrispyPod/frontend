import { FetchPagedEpisodes } from '$lib/serverFetch.js';

export async function load({ params }) {
  const page = Number(params.pageIndex) ?? 1;

  return await FetchPagedEpisodes(page);
}

