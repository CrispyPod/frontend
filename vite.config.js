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
		}
	}
});
