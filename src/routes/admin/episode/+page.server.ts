import type { Episode } from "$lib/models/episode";
import { serverGraphQLRequest } from "$lib/serverGrqphQLRequest.js";
import { token } from "$lib/stores/tokenStore";
import { get } from "svelte/store";

export async function load({ params }) {
    let sum = 0;
    let hasNextPage = false;
    let hasPreviousPage = false;

    let episodes: Array<Episode> = [];

    let curPage = 1;


    let skip = curPage * 25;

    const tokenS = get(token);
    const result = await serverGraphQLRequest(
        tokenS,
        `{
            episodes(pagination: {pageIndex:` +
        curPage +
        `, perPage: 25}){
items{
  id
  title
  description
  createTime
  episodeStatus
  thumbnailFileName
}
totalCount
pageInfo{
  hasNextPage
  hasPreviousPage
}
} 
}`
    );

    const resultJson = await result.json();

    episodes = resultJson.data.episodes.items ?? [];
    hasPreviousPage = resultJson.data.episodes.pageInfo.hasPreviousPage ?? false;
    hasNextPage = resultJson.data.episodes.pageInfo.hasNextPage ?? false;
    sum = resultJson.data.episodes.totalCount ?? 0;


    return {
        episodes,
        hasPreviousPage,
        hasNextPage,
        sum
    };

}
