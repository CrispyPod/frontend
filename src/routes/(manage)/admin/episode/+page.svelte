<script lang="ts">
	import AdminPagination from '$lib/components/AdminPagination.svelte';
	import type { Episode } from '$lib/models/episode';
	import { COLLECTION_EPISODE, pb } from '$lib/pb-integrate/pb_client';
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { EditOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	let sum = 0;
	let hasNextPage = false;
	let hasPreviousPage = false;

	let episodes: Array<Episode> = [];

	let curPage = 0;

	async function getAllEpisodes(pageIndex: number) {
		if (curPage == pageIndex) return;
		curPage = pageIndex;
		pb.collection(COLLECTION_EPISODE)
			.getList(pageIndex, 25, {
				sort: '-created'
			})
			.then((v) => {
				sum = v.totalItems;
				hasNextPage = curPage > v.totalPages;
				hasPreviousPage = curPage < 1;
				episodes = v.items as unknown as Array<Episode>;
			});
	}

	onMount(() => {
		getAllEpisodes(1);
	});
</script>

<!-- <span slot="actions"> -->
<div class="mt-5 flex lg:ml-4 lg:mt-0">
	<Button color="purple" size="xl">
		<PlusOutline />
		New
	</Button>
	<!-- <a class="sm:ml-3" href="/admin/episode/new">
		<button class="btn btn-active btn-primary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			New
		</button>
	</a> -->
</div>
<!-- </span> -->

<Table>
	<TableHead>
		<TableHeadCell>Episode Title</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<!-- <TableHeadCell>Category</TableHeadCell> -->
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each episodes as p, i}
			<TableBodyRow>
				<TableBodyCell>{p.title}</TableBodyCell>
				<TableBodyCell>
					{#if p.status == 'draft'}
						<div class="badge badge-neutral">Draft</div>
					{:else}
						<div class="badge badge-accent">Published</div>
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					<Button color="light" href="/admin/episode/edit?e={p.id}">
						<EditOutline />
						Edit
					</Button>
				</TableBodyCell>
				<!-- <TableBodyCell>$1999</TableBodyCell> -->
			</TableBodyRow>
			<!-- <EpisodeItem episode={p} /> -->
		{/each}

		<!-- <TableBodyRow>
			<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
			<TableBodyCell>Sliver</TableBodyCell>
			<TableBodyCell>Laptop</TableBodyCell>
			<TableBodyCell>$2999</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell>Microsoft Surface Pro</TableBodyCell>
			<TableBodyCell>White</TableBodyCell>
			<TableBodyCell>Laptop PC</TableBodyCell>
			<TableBodyCell>$1999</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell>Magic Mouse 2</TableBodyCell>
			<TableBodyCell>Black</TableBodyCell>
			<TableBodyCell>Accessories</TableBodyCell>
			<TableBodyCell>$99</TableBodyCell>
		</TableBodyRow> -->
	</TableBody>
</Table>

<AdminPagination
	{sum}
	{hasNextPage}
	{hasPreviousPage}
	handlePageClick={(pageIndex) => {
		getAllEpisodes(pageIndex);
	}}
/>
