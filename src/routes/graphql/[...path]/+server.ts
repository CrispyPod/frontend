import { BACK_END_URL } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = ({ params, url }) => {
    return fetch(`${BACK_END_URL}${url.pathname}`);
};

export const POST: RequestHandler = ({ params, url, request }) => {
    return fetch(`${BACK_END_URL}${url.pathname}`, request);
};