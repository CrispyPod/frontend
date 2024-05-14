import { siteConfigS } from "$lib/stores/siteConfigStore.js";
import { get } from "svelte/store";

export async function load({ }) {
    await siteConfigS.refresh();
    const siteConfig = get(siteConfigS);
    return { siteConfig };
}