import { siteConfigS } from "$lib/stores/siteConfigStore";
import { prerendering } from "__sveltekit/environment";
import { get } from "svelte/store";

export function getSiteUrlPrefix(): string {
    if (prerendering) {
        let siteConfig = get(siteConfigS);
        // console.log(siteConfig);
        return siteConfig.site_url;
    } else {
        return '';
    }
}