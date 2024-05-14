// import { graphqlRequest } from '$lib/graphqlRequest';
import type { SiteConfig } from '$lib/models/siteConfig';
import { COLLECTION_SITE_CONFIG, pb } from '$lib/pb-integrate/pb_client';
import { get, writable } from 'svelte/store';

function siteConfigStore() {
	const { subscribe, set } = writable<SiteConfig>();

	async function init() {
		const v = get(siteConfigS);
		if (v == null) {
			await refresh();
		}
	}

	async function refresh() {
		const config = await pb.collection(COLLECTION_SITE_CONFIG).getFirstListItem("");
		siteConfigS.set(config as unknown as SiteConfig)
		// console.log(config);
	}

	return {
		refresh,
		subscribe,
		set,
		init
	};
}

export const siteConfigS = siteConfigStore();
