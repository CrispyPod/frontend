import { serverGraphQLRequest } from "$lib/serverGrqphQLRequest";
import type { RequestHandler } from "@sveltejs/kit";
import { exec } from "child_process";
import { SRC_FOLDER } from "$env/static/private";
import { dev } from "$app/environment";

export const POST: RequestHandler = async ({ request, url }) => {

    if (dev) {
        return new Response("Can not deploy in dev mode");
    }

    const headers = request.headers.get('authorization');
    const token = headers?.replace('Bearer ', '');

    let result = await serverGraphQLRequest(token!, `query{me{id,userName}}`);
    if (result.status != 200) {
        return new Response(String("Failed to verify jwt token"));
    }

    exec(`sh ${SRC_FOLDER}/build-static.sh`, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (err !== null) {
            console.log(`exec error: ${err}`);
        }
    });

    // console.log(await result.text());

    return new Response(String("Building"));
}