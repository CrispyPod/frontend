<script lang="ts">
	import { dev } from '$app/environment';
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import { request } from '$lib/graphqlRequest';
	import { token } from '$lib/stores/tokenStore';
	import { get } from 'svelte/store';

	async function handleDeploy() {
		if (!dev) {
			const tokenS = get(token);

			let result = await request('/admin/static-deploy', 'POST', tokenS, '');
			console.log(result);
		}
	}
</script>

<AdminLayout pageTitle="Static deploy">
	{#if dev}
		<p>Can not deploy in dev mode, please first build and then preview.</p>
	{:else}
		<button class="btn btn-primary" on:click={handleDeploy}>Deploy</button>
	{/if}
</AdminLayout>
