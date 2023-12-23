<script lang="ts">
	import { onMount } from 'svelte';
	import PagerIndex from './PagerIndex.svelte';

	let curPage: number = 0;
	let firstLoaded: boolean = false;
	export let perPage: number = 0;
	export let sum: number = 0;
	export let hasPreviousPage: boolean = false;
	export let hasNextPage: boolean = false;

	export let handlePageChange: (pageIndex: number) => Promise<any>;

	let pageIndecies: number[] = [];

	$: if (curPage > -1) onPageDataChanged();

	$: sum && calculateIndicies();

	function calculateIndicies() {
		pageIndecies = [];
		const centerPage = curPage + 1;
		pageIndecies.push(centerPage);
		const maxPages = Math.ceil(sum / perPage);
		for (let index = 1; index < 6 && pageIndecies.length < 5; index++) {
			pageIndecies = [
				centerPage - index > 0 ? centerPage - index : 0,
				...pageIndecies,
				centerPage + index <= maxPages ? centerPage + index : 0
			].filter((x) => x != 0);
		}
	}

	async function onPageDataChanged() {
		// console.log(sum);
		if (!firstLoaded) {
			firstLoaded = true;
			return;
		}
		await handlePageChange(curPage + 1);
		calculateIndicies();
	}
</script>

<div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
	<div class="flex flex-1 justify-between sm:hidden">
		<button
			on:click={() => {
				if (hasPreviousPage) {
					curPage = curPage - 1;
				}
			}}
			class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 {hasPreviousPage
				? ' text-gray-700'
				: 'text-gray-400'} text-sm font-medium hover:bg-gray-50"
			>Previous</button
		>
		<button
			on:click={() => {
				if (hasNextPage) {
					curPage = curPage + 1;
				}
			}}
			class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 {hasNextPage
				? ' text-gray-700'
				: 'text-gray-400'} text-sm font-medium hover:bg-gray-50"
			>Next</button
		>
	</div>
	<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
		<div>
			<p class="text-sm text-gray-700">
				Showing
				<span class="font-medium">{perPage * curPage}</span>
				to
				<span class="font-medium"
					>{perPage * (curPage + 1) > sum ? sum : perPage * (curPage + 1)}</span
				>
				of
				<span class="font-medium">{sum}</span>
				results
			</p>
		</div>
		<div>
			<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
				<a
					on:click={() => {
						if (hasPreviousPage) {
							curPage = curPage - 1;
						}
					}}
					href="#"
					class="relative inline-flex items-center rounded-l-md px-2 py-2 {hasPreviousPage
						? ''
						: 'text-gray-400'} ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
				>
					<span class="sr-only">Previous</span>
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
				{#each pageIndecies as pi, i}
					{#if pi == curPage + 1}
						<PagerIndex active={true} index={pi} />
					{:else}
						<PagerIndex
							active={false}
							index={pi}
							handleClick={() => {
								curPage = pi - 1;
							}}
						/>
					{/if}
				{/each}
				<a
					on:click={() => {
						if (hasNextPage) {
							curPage = curPage + 1;
						}
					}}
					href="#"
					class="relative inline-flex items-center rounded-r-md px-2 py-2 {hasNextPage
						? ''
						: 'text-gray-400'} ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
				>
					<span class="sr-only">Next</span>
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</nav>
		</div>
	</div>
</div>
