import { PUBLIC_PB_ENDPOINT } from '$env/static/public';
import { error, type RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async ({ url, params }) => {
	const file = await fetch(`${PUBLIC_PB_ENDPOINT}api/files/${params.collection}/${params.record}/${params.name}`)

	return file;
};