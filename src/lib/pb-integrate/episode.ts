import { COLLECTION_EPISODE, pb } from "./pb_client";

export async function getPublishedEpisodes(page: number): Promise<any> {
    const result = await pb.collection(COLLECTION_EPISODE).getList(page, 25, {
        filter:'status="published"',
        sort: '-created'
    });
    return result;
}

export async function getSingleEpisode(slug: string) {
    const result = await pb.collection(COLLECTION_EPISODE).getFirstListItem(`slug="${slug}" && status="published"`);
    return result;
}
