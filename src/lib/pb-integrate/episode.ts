import { COLLECTION_EPISODE, pb } from "./pb_client";

export async function getPublishedEpisodes(page: number): Promise<any> {
    const result = await pb.collection(COLLECTION_EPISODE).getList(page, 25, {
        filter:'published=true',
        sort: '-created'
    });
    return result;
}

export async function getSingleEpisode(slug: string) {
    const result = await pb.collection(COLLECTION_EPISODE).getFirstListItem(`slug="${slug}" && published=true`);
    return result;
}
