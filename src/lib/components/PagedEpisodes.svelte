<script lang="ts">
	import type { ListResult, RecordModel } from 'pocketbase';
	import EpisodeListItem from './EpisodeListItem.svelte';
	import Pager from './Pager.svelte';

	export let data: ListResult<RecordModel>;
</script>

<div class="grid lg:grid-cols-2">
	{#each data.items as e}
		<EpisodeListItem episode={e} />
	{/each}
</div>

{#if data.totalPages != 1}
	<Pager
		sum={data.totalItems}
		hasNextPage={data.page >= data.totalPages}
		hasPreviousPage={data.page > 1}
		curPage={data.page}
	/>
{/if}
