<script lang="ts">
	import { onMount } from 'svelte';

	export let curPage: number = 1;
	export let sum: number = 0;
	export let hasPreviousPage: boolean = false;
	export let hasNextPage: boolean = false;

	export let handlePageClick: (pageIndex: number) => any;

	let pageIndecies: number[] = [curPage];

	onMount(() => {
		const maxPages = Math.floor(sum / 25) + (sum % 25 > 0 ? 1 : 0);
		for (let index = 1; index < 6 && pageIndecies.length < 5; index++) {
			const prev = pageIndecies[0] - 1;
			// console.log(prev);
			if (prev > 0) {
				pageIndecies = [prev, ...pageIndecies];
			}
			const next = pageIndecies[pageIndecies.length - 1] + 1;
			if (next <= maxPages) {
				pageIndecies = [...pageIndecies, next];
			}
		}
	});
</script>

<div class="flex">
	<div class="join mb-10 ml-auto">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a
			class="join-item btn"
			class:btn-disabled={!hasPreviousPage}
			href="javascript:;"
			on:click={handlePageClick(curPage - 1)}
		>
			«
		</a>
		{#each pageIndecies as pageIndex}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				class="join-item btn"
				class:btn-active={pageIndex == curPage}
				href="javascript:;"
				on:click={handlePageClick(pageIndex)}>{pageIndex}</a
			>
		{/each}
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a
			class="join-item btn"
			class:btn-disabled={!hasNextPage}
			href="javascript:;"
			on:click={handlePageClick(curPage + 1)}>»</a
		>
	</div>
</div>
