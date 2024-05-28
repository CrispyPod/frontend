import { PUBLIC_BUILD_STATIC, PUBLIC_PB_ENDPOINT } from "$env/static/public";
import type { RequestHandler } from "./$types";

export const prerender = PUBLIC_BUILD_STATIC == "1";

export const GET: RequestHandler = async ({ url }) => {
        let xmlUrl = `${PUBLIC_PB_ENDPOINT}/rss.xml`;
        let urlContent = await fetch(xmlUrl);

        return new Response(urlContent.body);
};
