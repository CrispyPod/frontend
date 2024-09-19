import { PUBLIC_BUILD_STATIC } from "$env/static/public";

export const ssr = PUBLIC_BUILD_STATIC == "1";
export const prerender = PUBLIC_BUILD_STATIC == "1";
