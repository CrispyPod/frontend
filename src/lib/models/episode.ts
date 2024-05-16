import type { AudioFile } from './audioFile';


export class Episode {
	id: string;
	title: string;
	description: string;
	created: number;
	publish_time: Date | null;
	status: "draft" | "published";
	slug: string;
	thumbnail: string | null = null;
	audio_file: string | null = null;

	constructor(
		id: string,
		title: string,
		description: string,
		created: number,
		slug: string,
		status: "draft" | "published",
		publish_time: Date | null
	) {
		this.id = id;
		this.title = title;
		this.slug = slug;
		this.status = status;
		this.description = description;
		this.created = created;
		this.publish_time = publish_time;
	}
}
