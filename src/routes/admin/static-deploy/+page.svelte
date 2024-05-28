<script lang="ts">
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import { COLLECTION_STAITC_DEPLOY_LOG, pb } from '$lib/pb-integrate/pb_client';

	let deployLogs: Array<any> = [];

	async function triggerDeploy() {
		let headers: Record<string, any> = {
			'Content-Type': 'application/json',
			Authorization: pb.authStore.token
		};
		const result = await fetch('/admin/static-deploy', {
			method: 'POST',
			headers: headers
		});
		console.log(result);
	}

	function handleNewDeploy() {
		pb.collection(COLLECTION_STAITC_DEPLOY_LOG)
			.getFirstListItem(`status='started' || status='building' || status='deploying'`)
			.then((v) => {
				console.log(v);
			})
			.catch((e) => {
				if (e.status == 404) {
					triggerDeploy();
				}
			});
	}
</script>

<AdminLayout pageTitle="Static Deploy">
	<span slot="actions">
		<button class="btn btn-active btn-primary" on:click={handleNewDeploy}>New Deploy</button>
	</span>

	<ul role="list" class="divide-y divide-gray-100">
		{#each deployLogs as l}
			<li class="flex justify-center gap-x-6"></li>
		{/each}
	</ul>
</AdminLayout>
