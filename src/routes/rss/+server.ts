import { BACK_END_URL } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
        let xmlUrl = `${BACK_END_URL}/rss`;
        let urlContent = await fetch(xmlUrl);

        return new Response(urlContent.body);
};
