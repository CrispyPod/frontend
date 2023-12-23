import { EpisodeState } from "$lib/models/episode";

export function episodeStatusToString(episodeStatus:EpisodeState):String {
    switch (episodeStatus) {
        case EpisodeState.draft:
            return 'Draft';
        case EpisodeState.published:
            return 'Published';
        default:
            return '';
    }
    
}