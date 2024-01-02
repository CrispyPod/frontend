import { serverGraphQLRequest } from "$lib/serverGrqphQLRequest.js";

export async function load({ params }) {

  const result = await serverGraphQLRequest(
    null,
    `siteConfig{
          siteName,
          siteUrl,
          siteDescription,
        }}`
  );

  const jsonResp = await result.json();
  // console.log(jsonResp);

  return jsonResp.data;
}
