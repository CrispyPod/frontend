#!/bin/sh
echo "build for static"
export PUBLIC_BUILD_STATIC=1
cp svelte-configs/static-adapter.js svelte.config.js
npm run build
npx wrangler pages deploy build-static --project-name $CLOUDFLARE_PAGES_PROJECT_NAME
echo "recovering svelte build config"
cp svelte-configs/node-adapter.js svelte.config.js
