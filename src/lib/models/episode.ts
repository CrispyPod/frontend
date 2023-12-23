import type { AudioFile } from './audioFile';

export enum EpisodeState {
	draft = 0,
	published = 1
}

export class Episode {
	id: string;
	title: string;
	description: string;
	createTime: number;
	publishTime: Date | null;
	episodeStatus: EpisodeState;
	// audioFiles: AudioFile[] = [];
	thumbnailFileName: string | null = null;
	thumbnailUploadName: string | null = null;

	audioFileName: string | null = null;
	audioFileUploadName: string | null = null;
	audioFileDuration: number | null = null;

	// episodeStatusString: string = '';

	constructor(
		id: string,
		title: string,
		description: string,
		createTime: number,
		episodeStatus: EpisodeState,
		publishTime: Date | null
	) {
		this.id = id;
		this.title = title;
		this.episodeStatus = episodeStatus;
		this.description = description;
		this.createTime = createTime;
		this.publishTime = publishTime;
	}
}
