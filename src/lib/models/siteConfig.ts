export class SiteConfig {
	siteName: string;
	siteDescription: string;
	siteUrl: string;

	constructor(
		siteName: string,
		siteDescription: string,
		siteUrl: string
	) {
		this.siteName = siteName;
		this.siteDescription = siteDescription;
		this.siteUrl = siteUrl;
	}
}
