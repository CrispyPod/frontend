import { BACK_END_URL } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const req_url = event.url;
    let request: Request;
    if (req_url.pathname.startsWith("/graphql") || req_url.pathname.startsWith("/api")) {
        // clone the original request, but change the URL
        request = new Request(
            event.request.url.replace(req_url.protocol + "//" + req_url.host, BACK_END_URL),
            event.request,
        );
        // console.log(request);
        return fetch(request);
    }

    const response = await resolve(event);
    return response;
};




// import { BACK_END_URL } from '$env/static/private';
// import type { HandleFetch } from '@sveltejs/kit';

// export const handleFetch: HandleFetch = async ({ request, fetch }) => {
//     const req_url = new URL(request.url);
//     console.log(req_url);
//     if (req_url.pathname.startsWith("/graphql")) {
//         // clone the original request, but change the URL
//         request = new Request(
//             request.url.replace(req_url.host, BACK_END_URL),
//             request,
//         );
//     }

//     return fetch(request);
// };