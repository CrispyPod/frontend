import { FetchPagedEpisodes } from '$lib/serverFetch.js';

export async function load({ params }) {
  return await FetchPagedEpisodes(1);
}

