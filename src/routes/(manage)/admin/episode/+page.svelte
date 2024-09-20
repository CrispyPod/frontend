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
		TableHeadCell,
		Search,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Checkbox
	} from 'flowbite-svelte';
	import { Section, TableHeader } from 'flowbite-svelte-blocks';
	import { EditOutline, PlusOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
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

<TableHeader headerType="search">
	<!-- <Search slot="search" size="md" /> -->
	<Button href="/admin/episode/new" color="purple">
		<PlusOutline class="mr-2" />
		Add episode
	</Button>
	<!-- <Button color="light">
		Actions<ChevronDownOutline />
	</Button>
	<Dropdown>
		<DropdownItem>Mass Edit</DropdownItem>
		<DropdownDivider />
		<DropdownItem>Delete all</DropdownItem>
	</Dropdown> -->
	<!-- <Button color="light">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			class="w-4 h-4 mr-2 text-gray-400"
			viewbox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
				clip-rule="evenodd"
			/>
		</svg>
		Filter<ChevronDownOutline />
	</Button> -->
	<!-- <Dropdown class="w-48 p-2 text-sm">
		<h6 class="mb-3 ml-1 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
		<li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Checkbox>Apple (56)</Checkbox>
		</li>
		<li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Checkbox>Fitbit (56)</Checkbox>
		</li>
		<li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Checkbox checked>Dell (56)</Checkbox>
		</li>
		<li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Checkbox>Asus (97)</Checkbox>
		</li>
	</Dropdown> -->
</TableHeader>

<Table>
	<TableHead>
		<TableHeadCell>Episode Title</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
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
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

{#if episodes.length > 25}
	<AdminPagination
		{sum}
		{hasNextPage}
		{hasPreviousPage}
		handlePageClick={(pageIndex) => {
			getAllEpisodes(pageIndex);
		}}
	/>
{/if}
