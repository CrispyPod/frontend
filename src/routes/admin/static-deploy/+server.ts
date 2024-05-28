import { SRC_FOLDER } from "$env/static/private";
import { COLLECTION_STAITC_DEPLOY_LOG, pb } from "$lib/pb-integrate/pb_client";
import type { RequestHandler } from "@sveltejs/kit";
import { exec, spawn } from 'child_process';
import { configDotenv } from "dotenv";
import type { RecordModel } from "pocketbase";

export const POST: RequestHandler = async ({ request }) => {
    const headers = request.headers.get('Authorization');
    console.log(headers);
    pb.authStore.save(headers!);

    const newLog = await pb.collection(COLLECTION_STAITC_DEPLOY_LOG).create({ status: 'deploying' });
    console.log(newLog);

    configDotenv();

    let scriptLog: string = "";

    const intervalCancel = setInterval(updateLog, 1000);

    const job = spawn('sh', [`${SRC_FOLDER}/static-build.sh`]);
    job.stdout.setEncoding('utf8');
    job.stdout.on('data', function (data) {
        scriptLog += data;
    })

    job.stderr.setEncoding('utf-8');
    job.stderr.on('data', function (data) {
        scriptLog += data;
    });


    job.on('close', (code, signal) => {
        onBuildFinished(code);
    })

    job.on('exit', (code, signal) => {
        onBuildFinished(code);
    })

    function onBuildFinished(code: number | null) {
        if (pb.authStore.isValid) {
            clearInterval(intervalCancel);
            const data = {
                status: 'finished',
                log: scriptLog
            }
            if (code != 0) {
                data.status = 'failed';
            }
            pb.collection(COLLECTION_STAITC_DEPLOY_LOG)
                .update(newLog.id, data)
                .then((v) => {
                    pb.authStore.clear();
                });

        }
    }

    function updateLog() {
        const data = {
            log: scriptLog,
            status: 'deploying',
        }
        pb.collection(COLLECTION_STAITC_DEPLOY_LOG).update(newLog.id, data);
    }

    return new Response(JSON.stringify({ id: newLog.id }));
}

async function deploy(record: RecordModel) {
    
}

