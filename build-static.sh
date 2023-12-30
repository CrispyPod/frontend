#!/bin/sh
echo "build for static"
echo "export const prerender = true;" > src/routes/+layout.ts
cp svelte-configs/static-adapter.js svelte.config.js
npm run build
echo "recovering svelte build config"
echo "export const ssr=false;" > src/routes/+layout.ts
cp svelte-configs/node-adapter.js svelte.config.js
