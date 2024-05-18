<script lang="ts">
	import { goto } from '$app/navigation';
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import AdminPagination from '$lib/components/AdminPagination.svelte';
	import EpisodeItem from '$lib/components/EpisodeItem.svelte';
	import type { Episode } from '$lib/models/episode';
	import { COLLECTION_EPISODE, pb } from '$lib/pb-integrate/pb_client';
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
				hasNextPage = curPage >= v.totalPages;
				hasPreviousPage = curPage <= 1;
				episodes = v.items as unknown as Array<Episode>;
			});
	}

	onMount(() => {
		if (!pb.authStore.isValid) {
			goto('/admin/signin');
			return;
		}
		getAllEpisodes(1);
	});
</script>

<AdminLayout pageTitle="Episodes">
	<span slot="actions">
		<div class="mt-5 flex lg:ml-4 lg:mt-0">
			<a class="sm:ml-3" href="/admin/episode/new">
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

					New</button
				>
			</a>
		</div>
	</span>

	<ul role="list" class="divide-y divide-gray-100">
		{#each episodes as p, i}
			<EpisodeItem episode={p} />
		{/each}
	</ul>
	<AdminPagination
		{sum}
		hasNextPage={false}
		hasPreviousPage={false}
		handlePageClick={(pageIndex) => {
			getAllEpisodes(pageIndex);
		}}
	/>
</AdminLayout>
