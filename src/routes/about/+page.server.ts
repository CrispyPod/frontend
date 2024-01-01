import { siteConfigS } from "$lib/stores/siteConfigStore.js";
import { get } from "svelte/store";

export function load({ }) {
    let siteConfig = get(siteConfigS);
    return siteConfig;
}