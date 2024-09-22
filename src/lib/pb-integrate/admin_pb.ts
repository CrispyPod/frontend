import PocketBase from 'pocketbase';

// on /admin/*, we will all use front end rendering, and for the rest will use ssr
export const backend_pb = new PocketBase("/");

export const COLLECTION_USER = "users"
export const COLLECTION_EPISODE = "episodes"
export const COLLECTION_SITE_CONFIG = "site_config"
export const COLLECTION_STAITC_DEPLOY_LOG = "deploy_logs"
