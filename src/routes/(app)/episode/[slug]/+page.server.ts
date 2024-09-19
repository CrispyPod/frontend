import { getSingleEpisode } from "$lib/pb-integrate/episode.js";
import { siteConfigS } from "$lib/stores/siteConfigStore";
import { get } from "svelte/store";

export async function load({ params }) {
  const episodeSlug = params.slug;
  const siteConfig = get(siteConfigS);

  const episode = await getSingleEpisode(episodeSlug);

  return {
    siteConfig,
    episode
  };
}
