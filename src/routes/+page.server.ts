// import { FetchPagedEpisodes } from '$lib/serverFetch.js';

import { getEpisodes } from '$lib/pb-integrate/episode.js';
import { siteConfigS } from '$lib/stores/siteConfigStore.js';
import { get } from 'svelte/store';

export async function load({ }) {
  const episodes = await getEpisodes(1);
  await siteConfigS.refresh();
  const siteConfig = get(siteConfigS);
  // console.log(siteConfig);
  return {
    episodes,
    siteConfig
  };
  // try {
  // } catch (e) {
  //   return null;
  // }
}

