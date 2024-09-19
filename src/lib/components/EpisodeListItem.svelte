<script lang="ts">
	import { COLLECTION_EPISODE } from '$lib/pb-integrate/pb_client';
	import { Card } from 'flowbite-svelte';

	export let episode: any;
	export let linked: boolean = true;
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
				<img
					src={`/files/${COLLECTION_EPISODE}/${episode.id}/${episode.thumbnail}`}
					alt={episode.title}
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title">
					{episode.title}
				</h2>
			</div>
		</div>
	</a>
</div>
