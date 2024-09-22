import { browser } from '$app/environment';
import { PUBLIC_PB_ENDPOINT } from '$env/static/public';
import PocketBase from 'pocketbase';

// on /admin/*, we will all use front end rendering, and for the rest will use ssr
export const pb = new PocketBase(browser ? "/" : PUBLIC_PB_ENDPOINT);

export const COLLECTION_USER = "users"
export const COLLECTION_EPISODE = "episodes"
export const COLLECTION_SITE_CONFIG = "site_config"
export const COLLECTION_STAITC_DEPLOY_LOG = "deploy_logs"
