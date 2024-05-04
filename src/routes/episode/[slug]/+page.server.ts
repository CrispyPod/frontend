import { getSingleEpisode } from "$lib/pb-integrate/episode.js";

export async function load({ params }) {
  const episodeSlug = params.slug;

  const result = await getSingleEpisode(episodeSlug);

  return result;
}
