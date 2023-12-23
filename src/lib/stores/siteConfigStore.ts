import { graphqlRequest } from '$lib/graphqlRequest';
import type { SiteConfig } from '$lib/models/siteConfig';
import { get, writable } from 'svelte/store';

function siteConfigStore() {
	const { subscribe, set } = writable<SiteConfig>();

	async function init() {
		const v = get(siteConfigS);
		if (v == null) {
			const result = await graphqlRequest(
				null,
				`{
	  siteConfig{
		siteUrl
		siteName
		siteDescription
	  }
	}`
			);
			const jsonResp = await result.json();
			if (jsonResp.data != null) {
				siteConfigS.set(jsonResp.data.siteConfig);
			}
		}
	}

	return {
		subscribe,
		set,
		init
	};
}

export const siteConfigS = siteConfigStore();
