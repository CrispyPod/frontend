import { FetchPagedEpisodes } from "$lib/serverFetch";

export async function GET() {

    let isLastPage: boolean = false;

    let articles: any[] = [];
    let curPage = 1;

    let siteUrl: string = '';

    while (!isLastPage) {
        let apiArticles = await FetchPagedEpisodes(curPage);
        siteUrl = apiArticles.siteUrl;
        // console.log(apiArticles);
        apiArticles.episodes!.forEach((element: any) => {
            articles.push(element);
        });
        isLastPage = !apiArticles.hasNextPage;
        curPage += 1;
    }
    // console.log(articles);
    let mapNodes: string = '';
    articles.forEach((a) => {
        let eCreateTime = new Date(a.createTime * 1000);
        mapNodes += `
        <url>
            <loc>${siteUrl}/episode/${a.namedLink}</loc>
            <lastmod>${eCreateTime}</lastmod>
        </url>
        `;
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