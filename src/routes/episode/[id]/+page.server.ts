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
        }}`
  );

  const jsonResp = await result.json();

  const data = jsonResp.data;
  if (data == null) {
    return null;
  }

  if (data.episode.thumbnailFileName != null) {
    data.episode.thumbnailFileName = getSiteUrlPrefix() + '/api/thumbnail/' + data.episode.thumbnailFileName;
  } else {
    data.episode.thumbnailFileName = '/EpisodeDefaultThumbnailSquare.png';
  }

  if (data.episode.audioFileName != null) {
    data.episode.audioFileName = getSiteUrlPrefix() + "/api/audioFile/" + data.episode.audioFileName;
  }

  return data;
}
