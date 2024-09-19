<script lang="ts">
	import type { ListResult, RecordModel } from 'pocketbase';
	import EpisodeListItem from './EpisodeListItem.svelte';
	import Pager from './Pager.svelte';
	import { Heading } from 'flowbite-svelte';

	export let data: ListResult<RecordModel>;
</script>

<Heading class="text-center my-10">Episodes</Heading>
<div class="grid lg:grid-cols-2">
	{#each data.items as e}
		<EpisodeListItem episode={e} />
	{/each}
</div>

{#if data.totalPages != 1 && data.totalItems > 0}
	<Pager
		totalRows={data.totalItems}
		pageIndex={data.page}
		isFirstPage={data.page - 1 < 1}
		isLastPage={data.page == data.totalPages}
		pageSize={25}
		pagePrefix={'/episode'}
	/>
{/if}
