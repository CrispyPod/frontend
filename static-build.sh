#!/bin/sh
export PUBLIC_BUILD_STATIC=1
rm -rf build-static
cp svelte-configs/static-adapter.js svelte.config.js
npm run build
cp svelte-configs/node-adapter.js svelte.config.js
# npx wrangler pages deploy build-static --project-name $CLOUDFLARE_PAGES_PROJECT_NAME
# echo "recovering svelte build config"
