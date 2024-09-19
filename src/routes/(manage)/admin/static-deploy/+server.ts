import { SRC_FOLDER } from "$env/static/private";
import { COLLECTION_STAITC_DEPLOY_LOG, pb } from "$lib/pb-integrate/pb_client";
import type { RequestHandler } from "@sveltejs/kit";
import { spawn } from 'child_process';
import { configDotenv } from "dotenv";
import type { RecordModel } from "pocketbase";

let buildLog: string = "";
let deployLog: string = "";

function startBuild(record: RecordModel, callback: () => any) {
    configDotenv();
    console.log("Start build");
    const intervalCancel = setInterval(() => {
        const data = {
            build_log: buildLog,
            // deploy_log: deployLog,
            status: 'building',
        }
        pb.collection(COLLECTION_STAITC_DEPLOY_LOG).update(record.id, data).then((v) => {
            if (v.status != 'buildling') {
                clearInterval(intervalCancel);
            }
        }).catch((e) => {
            console.log("build update log error:");
            console.log(e);
        });
    }, 1000);

    const job = spawn('sh', [`${SRC_FOLDER}/static-build.sh`]);
    job.stdout.setEncoding('utf8');
    job.stdout.on('data', function (data) {
        buildLog += data;
    })

    job.stderr.setEncoding('utf-8');
    job.stderr.on('data', function (data) {
        buildLog += data;
    });


    job.on('close', (code, signal) => {
        onBuildFinished(code);
    })

    job.on('exit', (code, signal) => {
        onBuildFinished(code);
    })

    function onBuildFinished(code: number | null) {
        if (pb.authStore.isValid) {
            const data = {
                status: 'deploying',
                build_log: buildLog,
            }
            if (code != 0) {
                data.status = 'failed';
            }
            pb.collection(COLLECTION_STAITC_DEPLOY_LOG)
                .update(record.id, data)
                .then((v) => {
                    if (v.status == 'deploying') {
                        callback();
                    }
                }).catch((e) => {
                    console.log("build finish error:");
                    console.log(e);
                });

        }
    }
}

function startDeploy(record: RecordModel) {
    console.log("Start deploy");
    const intervalCancel = setInterval(() => {
        const data = {
            // build_log: buildLog,
            deploy_log: deployLog,
            status: 'deploying',
        }
        pb.collection(COLLECTION_STAITC_DEPLOY_LOG).update(record.id, data).then((v) => {
            if (v.status != 'deploying') {
                pb.authStore.clear();
                clearInterval(intervalCancel);
            }
        }).catch((e) => {
            console.log("deploy update log error:");
            console.log(e);
        });
    }, 1000);

    const job = spawn('sh', [`${SRC_FOLDER}/static-deploy.sh`]);
    job.stdout.setEncoding('utf8');
    job.stdout.on('data', function (data) {
        deployLog += data;
    })

    job.stderr.setEncoding('utf-8');
    job.stderr.on('data', function (data) {
        deployLog += data;
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
                deploy_log: deployLog,
            }
            if (code != 0) {
                data.status = 'failed';
            }
            pb.collection(COLLECTION_STAITC_DEPLOY_LOG)
                .update(record.id, data)
                .then((v) => {
                    // pb.authStore.clear();
                }).catch((e) => {
                    console.log("deploy finish error:");
                    console.log(e);
                });
        }
    }
}

export const POST: RequestHandler = async ({ request }) => {
    const headers = request.headers.get('Authorization');
    pb.authStore.save(headers!);

    const newLog = await pb.collection(COLLECTION_STAITC_DEPLOY_LOG).create({ status: 'building' });


    startBuild(newLog, () => {
        startDeploy(newLog);
    });

    return new Response(JSON.stringify({ id: newLog.id }));
}

