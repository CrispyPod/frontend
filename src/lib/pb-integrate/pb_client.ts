import { dev } from "$app/environment";
import { PUBLIC_BUILD_STATIC, PUBLIC_PB_ENDPOINT } from "$env/static/public";
import PocketBase from 'pocketbase';

export const pb = new PocketBase(dev || PUBLIC_BUILD_STATIC == "1" ? PUBLIC_PB_ENDPOINT : "http://127.0.0.1:3000/");

export const COLLECTION_USER = "users"
export const COLLECTION_EPISODE = "episodes"
export const COLLECTION_SITE_CONFIG = "site_config"
