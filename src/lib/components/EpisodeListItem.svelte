<script lang="ts">
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { COLLECTION_EPISODE, COLLECTION_SITE_CONFIG } from '$lib/pb-integrate/pb_client';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let episode: any;
	export let linked: boolean = true;

	let sc: SiteConfig | null;

	onMount(() => {
		sc = get(siteConfigS);
		siteConfigS.subscribe((v) => {
			sc = v;
		});
	});
</script>

<!-- 
<div class="space-y-4">
	<Card
		img={`/files/${COLLECTION_EPISODE}/${episode.id}/${episode.thumbnail}`}
		href={!linked || episode.slug == undefined ? 'javascript:;' : `/episode/${episode.slug}`}
		horizontal
		size="md"
	>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{episode.title}
		</h5>
	</Card>
</div> -->

<div class="w-full flex justify-center">
	<a href={!linked || episode.slug == undefined ? 'javascript:;' : `/episode/${episode.slug}`}>
		<div class="card w-64 md:w-96 shadow-xl m-10 bg-base-200">
			<figure>
				{#if episode.thumbnail == null || episode.thumbnail.length == 0}
					<img
						src={`/files/${COLLECTION_SITE_CONFIG}/${sc?.id}/${sc?.default_thumbnail}`}
						alt={episode.title}
					/>
				{:else}
					<img
						src={`/files/${COLLECTION_EPISODE}/${episode.id}/${episode.thumbnail}`}
						alt={episode.title}
					/>
				{/if}
			</figure>
			<div class="card-body">
				<h2 class="card-title">
					{episode.title}
				</h2>
			</div>
		</div>
	</a>
</div>
