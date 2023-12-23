import { graphqlRequest } from '$lib/graphqlRequest';
import type { Episode } from '$lib/models/episode';

export async function load({ }) {
    let episodes: Array<Episode> | null = null;
    let siteName: string = '';
    let siteDescription: string = '';

    let sum = 0;
    let hasNextPage = false;
    let hasPreviousPage = false;


    let result = await graphqlRequest(
        null,
        `query{
episodes(pagination: {pageIndex: 1, perPage: 10}){
items{
  id,
  title,
  description,
  createTime,
  thumbnailFileName,
},
totalCount,
pageInfo{
  hasNextPage,
  hasPreviousPage
},
} 
}`
    );

    let json_resp = await result.json();
    episodes = json_resp.data.episodes.items;

    hasPreviousPage = json_resp.data.episodes.pageInfo.hasPreviousPage ?? false;
    hasNextPage = json_resp.data.episodes.pageInfo.hasNextPage ?? false;
    sum = json_resp.data.episodes.totalCount ?? 0;


    return {
        episodes,
        siteName,
        siteDescription,
        sum,
        hasNextPage,
        hasPreviousPage,
    };
}

