<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { COLLECTION_STAITC_DEPLOY_LOG, pb } from '$lib/pb-integrate/pb_client';
	import { Accordion, AccordionItem, Heading, P } from 'flowbite-svelte';
	import { Section } from 'flowbite-svelte-blocks';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';

	let recordDetail: RecordModel;

	onMount(() => {
		const logId = $page.url.searchParams.get('id');
		if (logId == null || logId.length == 0) {
			goto('/admin/static-deploy');
			return;
		}

		pb.collection(COLLECTION_STAITC_DEPLOY_LOG)
			.getFirstListItem(`id="${logId}"`, {})
			.then((v) => {
				recordDetail = v;
				if (v.status != 'finished' || v.status != 'failed') {
					pb.collection(COLLECTION_STAITC_DEPLOY_LOG).subscribe(v.id, (e) => {
						recordDetail = e.record;
						if (e.record.status == 'finished' || e.record.status == 'failed') {
							pb.collection(COLLECTION_STAITC_DEPLOY_LOG).unsubscribe(e.record.id);
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

{#if recordDetail != null}
	<Section>
		<div class="grid grid-cols-2">
			<div>
				<Heading tag="h3">{recordDetail.status}</Heading>
				<P class="text-gray-500">Status</P>
			</div>
			<div>
				<Heading tag="h5"
					>{recordDetail.created.split('.')[0]} ~ {recordDetail.status == 'finished' ||
					recordDetail.status == 'failed'
						? recordDetail.updated.split('.')[0]
						: '--'}</Heading
				>
				<P class="text-gray-500">Duration</P>
			</div>
		</div>
	</Section>
{/if}

<Accordion>
	<AccordionItem open>
		<span slot="header">Build Log</span>
		<pre class="font-mono">
			{#if recordDetail != null}
				{@html recordDetail.build_log}
			{/if}
		</pre>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">Deploy Log</span>

		<pre class="font-mono">
			{#if recordDetail != null}
				{@html recordDetail.deploy_log}
			{/if}
		</pre>
	</AccordionItem>
</Accordion>
