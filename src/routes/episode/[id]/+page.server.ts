import { getSiteUrlPrefix } from "$lib/helpers/siteUrlPrefix";
import { serverGraphQLRequest } from "$lib/serverGrqphQLRequest.js";

export async function load({ params }) {
  const episodeId = params.id;

  const result = await serverGraphQLRequest(
    null,
    `{episode(namedLink:"` +
    episodeId +
    `"){id,title,createTime,description,audioFileName,audioFileDuration,thumbnailFileName},
        siteConfig{
          siteName,
          siteUrl,
          siteDescription,
          defaultThumbnail,
        }}`
  );

  const jsonResp = await result.json();

  const data = jsonResp.data;
  if (data == null) {
    return null;
  }

  if (data.episode.thumbnailFileName != null) {
    data.episode.thumbnailFileName = getSiteUrlPrefix() + '/api/imageFile/' + data.episode.thumbnailFileName;
  } else if (data.siteConfig.defaultThumbnail != null && data.siteConfig.defaultThumbnail.length > 0) {
    data.episode.thumbnailFileName = "/api/imageFile/" + data.siteConfig.defaultThumbnail;
  } else {
    data.episode.thumbnailFileName = '/EpisodeDefaultThumbnailSquare.png';
  }

  if (data.episode.audioFileName != null) {
    data.episode.audioFileName = getSiteUrlPrefix() + "/api/audioFile/" + data.episode.audioFileName;
  }

  return data;
}
