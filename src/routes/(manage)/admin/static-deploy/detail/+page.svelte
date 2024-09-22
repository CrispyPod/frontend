<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { COLLECTION_STAITC_DEPLOY_LOG, backend_pb } from '$lib/pb-integrate/admin_pb';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';

	let recordDetail: RecordModel;

	onMount(() => {
		const logId = $page.url.searchParams.get('d');
		if (logId == null || logId.length == 0) {
			goto('/admin/static-deploy');
			return;
		}

		backend_pb
			.collection(COLLECTION_STAITC_DEPLOY_LOG)
			.getFirstListItem(`id="${logId}"`, {})
			.then((v) => {
				recordDetail = v;
				if (v.status != 'finished' || v.status != 'failed') {
					backend_pb.collection(COLLECTION_STAITC_DEPLOY_LOG).subscribe(v.id, (e) => {
						recordDetail = e.record;
						if (e.record.status == 'finished' || e.record.status == 'failed') {
							backend_pb.collection(COLLECTION_STAITC_DEPLOY_LOG).unsubscribe(e.record.id);
						}
					});
				}
			})
			.catch((e) => {
				goto('/admin/static-deploy');
				return;
			});
	});
</script>

<div class="collapse collapse-arrow bg-base-200 mb-5">
	<input type="radio" name="my-accordion-2" checked={true} />
	<div class="collapse-title text-xl font-medium">Build Log</div>
	<div class="collapse-content overflow-scroll">
		<pre class="font-mono">
				{#if recordDetail != null}
				{@html recordDetail.build_log}
			{/if}
			</pre>
	</div>
</div>
<div class="collapse collapse-arrow bg-base-200">
	<input type="radio" name="my-accordion-2" />
	<div class="collapse-title text-xl font-medium">Deploy Log</div>
	<div class="collapse-content overflow-scroll">
		<pre class="font-mono">
				{#if recordDetail != null}
				{@html recordDetail.deploy_log}
			{/if}
			</pre>
	</div>
</div>
