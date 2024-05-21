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
			'/api': {
				target: `${env.PUBLIC_PB_ENDPOINT}/api`,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
		}
	}
});
