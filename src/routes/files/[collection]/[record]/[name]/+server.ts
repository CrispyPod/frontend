import { PUBLIC_PB_ENDPOINT,PUBLIC_BUILD_STATIC } from '$env/static/public';
import { error, type RequestHandler } from '@sveltejs/kit';

export const prerender = PUBLIC_BUILD_STATIC == "1";

export const GET: RequestHandler = async ({ url, params }) => {
	const file = await fetch(`${PUBLIC_PB_ENDPOINT}api/files/${params.collection}/${params.record}/${params.name}`)

	return file;
};