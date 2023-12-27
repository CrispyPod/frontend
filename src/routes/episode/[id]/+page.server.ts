import { graphqlRequest } from "$lib/graphqlRequest";
import { serverGraphQLRequest } from "$lib/serverGrqphQLRequest.js";


export async function load({ params }) {
    const episodeId = params.id;

    const result = await serverGraphQLRequest(
        null,
        `{episode(id:"` +
        episodeId +
        `"){id,title,createTime,description,audioFileName,audioFileDuration},
        siteConfig{
          siteName,
          siteUrl,
          siteDescription,
        }}`
    );

    const jsonResp = await result.json();
    // console.log(jsonResp);

    return jsonResp.data;
}
