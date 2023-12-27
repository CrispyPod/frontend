#!/bin/sh

# logic: check parameters passed to this script:
# 1. if build for node, then do not touch anything, run `npm run build` directly
# 2. if build for static, then overwrite `svelte.config.js` with `svelte-config/static-adapter.js`, then build

TARGET=$1

recoverConfig(){
    # default build target is node
    echo "recovering svelte build config"
    rm routes/+layout.ts
    cp svelte-configs/node-adapter.js svelte.config.js
}

if [ -z "$TARGET" ]; then
    echo "Build target not provided, setting target to node"
    TARGET="node"
fi

if [ "$TARGET" = "node" ]; then
    echo "build for node"
    npm run build
elif [ "$TARGET" = "static" ]; then
    echo "build for static"
    echo "export const prerender = true;" > src/routes/+layout.ts
    npm run build-static
    recoverConfig
else
    echo "Please provide correct build target"
    echo "Available target: node, static"
    echo "sh build.sh [target]"
fi
