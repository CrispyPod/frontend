#!/bin/sh
echo "build for static"
cd $SRC_FOLDER
echo "export const prerender = true;" > src/routes/+layout.ts
cp svelte-configs/static-adapter.js svelte.config.js
npm run build
npx wrangler pages deploy build-static --project-name $CLOUDFLARE_PAGES_PROJECT_NAME
echo "recovering svelte build config"
echo "export const ssr=false;" > src/routes/+layout.ts
cp svelte-configs/node-adapter.js svelte.config.js
