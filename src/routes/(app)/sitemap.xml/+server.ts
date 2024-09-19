import { PUBLIC_BUILD_STATIC } from "$env/static/public";
import { COLLECTION_EPISODE, pb } from "$lib/pb-integrate/pb_client";
import { siteConfigS } from "$lib/stores/siteConfigStore";
import { get } from "svelte/store";

export const prerender = PUBLIC_BUILD_STATIC == "1";

export async function GET() {
    await siteConfigS.refresh();
    const siteConfig = get(siteConfigS);

    let mapNodes: string = '';
    const publishedEpisodes = await pb.collection(COLLECTION_EPISODE).getFullList({ filter: 'status="published"' });

    publishedEpisodes.forEach((e) => {
        mapNodes += `<url><loc>${siteConfig.site_url}/episode/${e.slug}</loc><lastmod>${e.updated.split(' ')[0]}</lastmod></url>`
    })

    return new Response(
        `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
${mapNodes}
		</urlset></xml>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml',
            },
        },
    );
}