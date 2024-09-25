#!/bin/sh
npx wrangler pages deploy build-static --project-name $CLOUDFLARE_PAGES_PROJECT_NAME --branch main
# echo "recovering svelte build config"
# cp svelte-configs/node-adapter.js svelte.config.js