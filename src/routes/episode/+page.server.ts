import { getSiteUrlPrefix } from '$lib/helpers/siteUrlPrefix';
import type { Episode } from '$lib/models/episode';
import { serverGraphQLRequest } from '$lib/serverGrqphQLRequest';

export async function load({ params }) {

  let episodes: Array<Episode> | null = null;
  let siteName: string = '';
  let siteDescription: string = '';

  let sum = 0;
  let hasNextPage = false;
  let hasPreviousPage = false;


  let result = await serverGraphQLRequest(
    null,
    `query{
      episodeList(pagination: {pageIndex: 1, perPage: 25}){
          items{
            id,
            title,
            description,
            createTime,
            thumbnailFileName,
            namedLink,
          },
          totalCount,
          pageInfo{
            hasNextPage,
            hasPreviousPage
          },
          },
            siteConfig{
              siteName,
              siteUrl,
              siteDescription,
            }
          }`
  );

  let json_resp = await result.json();
  episodes = json_resp.data.episodeList.items;

  hasPreviousPage = json_resp.data.episodeList.pageInfo.hasPreviousPage ?? false;
  hasNextPage = json_resp.data.episodeList.pageInfo.hasNextPage ?? false;
  sum = json_resp.data.episodeList.totalCount ?? 0;

  siteName = json_resp.data.siteConfig.siteName;
  siteDescription = json_resp.data.siteConfig.siteDescription;
  let siteUrl = json_resp.data.siteConfig.siteUrl;

  episodes?.forEach((e) => {
    if (e.thumbnailFileName != null) {
      e.thumbnailFileName = getSiteUrlPrefix() + '/api/thumbnail/' + e.thumbnailFileName;
    } else {
      e.thumbnailFileName = '/EpisodeDefaultThumbnailSquare.png';
    }
  })
  return {
    episodes,
    siteName,
    siteDescription,
    siteUrl,
    sum,
    hasNextPage,
    hasPreviousPage,
  };
}

