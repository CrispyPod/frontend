import { request } from "./graphqlRequest";
import { BACK_END_URL } from "$env/static/private";

export async function serverGraphQLRequest(token: string | null, body: string) {
    return await request(`${BACK_END_URL}/graphql`, 'POST', token, JSON.stringify({
        query: body
    }));
}