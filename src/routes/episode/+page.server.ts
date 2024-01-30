import { FetchPagedEpisodes } from '$lib/serverFetch.js';

export async function load({ }) {
  return await FetchPagedEpisodes(1);
}

