// import { FetchPagedEpisodes } from '$lib/serverFetch.js';

import { getEpisodes } from '$lib/pb-integrate/episode.js';

export async function load({ }) {
  const episodes = await getEpisodes(1);
  return {
    episodes
  };
  // try {
  // } catch (e) {
  //   return null;
  // }
}

