import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    return {
        logID: params.logID,
        hookID: params.id
    }
}