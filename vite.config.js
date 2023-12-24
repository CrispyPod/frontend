import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const env = { ...process.env, ...loadEnv('all', process.cwd(), "") };
if (env.BACK_END_URL == undefined) {
	console.error("$BACK_END_URL not set!");
}
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
		exclude: ['bytemd']
	},
	server: {
		proxy: {
			'/graphql': {
				target: `${env.BACK_END_URL}/graphql`,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/graphql/, '')
			},
			'/api': {
				target: `${env.BACK_END_URL}/api`,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
			'/rss': {
				target: `${env.BACK_END_URL}/rss`,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/rss/, '')
			}
		}
	}
});
