import { PUBLIC_PB_ENDPOINT } from "$env/static/public";
import PocketBase from 'pocketbase';

export const pb = new PocketBase(PUBLIC_PB_ENDPOINT);

export const COLLECTION_EPISODE="episodes"
