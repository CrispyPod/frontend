// import { FetchPagedEpisodes } from '$lib/serverFetch.js';

import { getPublishedEpisodes } from "$lib/pb-integrate/episode";
import { siteConfigS } from "$lib/stores/siteConfigStore";
import { get } from "svelte/store";

export async function load({ params }) {
  const page = Number(params.pageIndex) ?? 1;

  const episodes = await getPublishedEpisodes(1);
  await siteConfigS.refresh();
  const siteConfig = get(siteConfigS);
  return {
    episodes,
    siteConfig
  }
}

