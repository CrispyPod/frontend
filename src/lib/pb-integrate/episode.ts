import { COLLECTION_EPISODE, pb } from "./pb_client";

export async function getEpisodes(page: number): Promise<any> {
    const result = await pb.collection(COLLECTION_EPISODE).getList(page, 25, {
        sort: '-created'
    });
    return result;
}

export async function getSingleEpisode(slug: string) {
    const result = await pb.collection(COLLECTION_EPISODE).getFirstListItem(`slug="${slug}"`);
    return result;
}
