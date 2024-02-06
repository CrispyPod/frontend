import { getSiteUrlPrefix } from "./helpers/siteUrlPrefix";
import type { Episode } from "./models/episode";
import { serverGraphQLRequest } from "./serverGrqphQLRequest";
import { siteConfigS } from "./stores/siteConfigStore";

export async function FetchPagedEpisodes(pageIndex: number) {
  let episodes: Array<Episode> | null = null;

  let sum = 0;
  let hasNextPage = false;
  let hasPreviousPage = false;


  let result = await serverGraphQLRequest(
    null,
    `query{
        episodeList(pagination: {pageIndex: ${pageIndex}, perPage: 25}){
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
                siteIconFile,
                defaultThumbnail,
                headAnalytics,
                footerAnalytics
              }
            }`
  );

  let json_resp = await result.json();

  hasPreviousPage = json_resp.data.episodeList.pageInfo.hasPreviousPage ?? false;
  hasNextPage = json_resp.data.episodeList.pageInfo.hasNextPage ?? false;
  sum = json_resp.data.episodeList.totalCount ?? 0;

  siteConfigS.set({
    ...json_resp.data.siteConfig
  });

  episodes = json_resp.data.episodeList.items;
  episodes?.forEach((e) => {
    if (e.thumbnailFileName != null) {
      e.thumbnailFileName = getSiteUrlPrefix() + '/api/imageFile/' + e.thumbnailFileName;
    } else {
      e.thumbnailFileName = json_resp.data.siteConfig.defaultThumbnail.length > 0 ? getSiteUrlPrefix() + `/api/imageFile/${json_resp.data.siteConfig.defaultThumbnail}` : '/EpisodeDefaultThumbnailSquare.png';
    }
  })

  return {
    episodes,
    ...json_resp.data.siteConfig,
    sum,
    hasNextPage,
    hasPreviousPage,
  };
}