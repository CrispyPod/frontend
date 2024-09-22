// import { graphqlRequest } from '$lib/graphqlRequest';
import type { SiteConfig } from '$lib/models/siteConfig';
import { COLLECTION_SITE_CONFIG, backend_pb } from '$lib/pb-integrate/admin_pb';
import { get, writable } from 'svelte/store';

function siteConfigStore() {
    const { subscribe, set } = writable<SiteConfig>();

    async function init() {
        const v = get(adminSiteConfigS);
        if (v == null) {
            await refresh();
        }
    }

    async function refresh() {
        const config = await backend_pb.collection(COLLECTION_SITE_CONFIG).getFirstListItem("");
        adminSiteConfigS.set(config as unknown as SiteConfig)
        // console.log(config);
    }

    return {
        refresh,
        subscribe,
        set,
        init
    };
}

export const adminSiteConfigS = siteConfigStore();
