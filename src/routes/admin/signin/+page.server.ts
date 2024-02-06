import { serverGraphQLRequest } from '$lib/serverGrqphQLRequest';

export async function load({ }) {
    let result = await serverGraphQLRequest(
        null,
        `query{
              siteConfig{
                siteName,
              }
            }`
    );

    let jsonResp = await result.json();
    return jsonResp.data;
}

