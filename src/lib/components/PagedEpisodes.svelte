<script lang="ts">
	import type { Episode } from '$lib/models/episode';
	import EpisodeListItem from './EpisodeListItem.svelte';
	import Pager from './Pager.svelte';

	export let episodes: Array<Episode> = [];
	export let curPage: number = 1;

	export let sum = 0;
	export let hasNextPage = false;
	export let hasPreviousPage = false;
	// console.log(episodes);
</script>

<div class="grid lg:grid-cols-2">
	{#each episodes as e}
		<EpisodeListItem episode={e} />
	{/each}
</div>

<Pager {sum} {hasNextPage} {hasPreviousPage} {curPage} />
