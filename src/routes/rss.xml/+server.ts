import { PUBLIC_PB_ENDPOINT } from "$env/static/public";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
        let xmlUrl = `${PUBLIC_PB_ENDPOINT}/rss.xml`;
        let urlContent = await fetch(xmlUrl);

        return new Response(urlContent.body);
};
