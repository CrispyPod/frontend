import { getPublishedEpisodes } from '$lib/pb-integrate/episode.js';
import { siteConfigS } from '$lib/stores/siteConfigStore.js';
import { get } from 'svelte/store';

export async function load({ }) {
  const episodes = await getPublishedEpisodes(1);
  await siteConfigS.refresh();
  const siteConfig = get(siteConfigS);
  return {
    episodes,
    siteConfig
  };
}