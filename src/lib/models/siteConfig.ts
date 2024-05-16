export class SiteConfig {
	id: string = '';
	site_name: string;
	site_description: string;
	site_url: string;
	site_icon: string | null = "";
	setup_step: "welcome" | "changepassword" | "changesitesetting" | "finish" | "done" = "welcome";
	default_thumbnail: string | null = "";
	head_analytics: string | null = "";
	footer_analytics: string | null = "";

	constructor(
		site_name: string,
		site_description: string,
		site_url: string,
	) {
		this.site_name = site_name;
		this.site_description = site_description;
		this.site_url = site_url;
	}
}
