<script lang="ts">
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import { request } from '$lib/graphqlRequest';
	import { token } from '$lib/stores/tokenStore';
	import { get } from 'svelte/store';

	async function handleDeploy() {
		const tokenS = get(token);

		let result = await request('/admin/static-deploy', 'POST', tokenS, '');
		console.log(result);
	}
</script>

<AdminLayout pageTitle="Static deploy">
	<button class="btn btn-primary" on:click={handleDeploy}>Deploy</button>
</AdminLayout>
