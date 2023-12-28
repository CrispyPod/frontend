<script lang="ts">
	import { onMount } from 'svelte';
	import AdminLayout from '../../../lib/components/AdminLayout.svelte';
	import type { Episode } from '$lib/models/episode';
	import EpisodeItem from '../../../lib/components/EpisodeItem.svelte';
	import Pager from '../../../lib/components/Pager.svelte';
	// import { Icon, Plus } from 'svelte-hero-icons';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import { get } from 'svelte/store';
	import { token } from '$lib/stores/tokenStore';
	let sum = 0;
	let perPage = 10;
	let hasNextPage = false;
	let hasPreviousPage = false;

	let episodes: Array<Episode> = [];

	let mobileMoreExpanded = false;

	async function getPagedData(newPage: number) {
		// calculate skip
		let skip = newPage * perPage;

		const tokenS = get(token);
		const result = await graphqlRequest(
			tokenS,
			`{
				episodes(pagination: {pageIndex:` +
				newPage +
				`, perPage: ` +
				perPage +
				`}){
    items{
      id
      title
	  description
      createTime
	  episodeStatus
      thumbnailFileName
    }
    totalCount
    pageInfo{
      hasNextPage
      hasPreviousPage
    }
  } 
}`
		);

		const resultJson = await result.json();

		episodes = resultJson.data.episodes.items ?? [];
		hasPreviousPage = resultJson.data.episodes.pageInfo.hasPreviousPage ?? false;
		hasNextPage = resultJson.data.episodes.pageInfo.hasNextPage ?? false;
		sum = resultJson.data.episodes.totalCount ?? 0;
	}

	onMount(async () => {
		await getPagedData(0);
		// console.log(episodeArr);
	});

	async function handlePageChange(pageIndex: number) {
		// curPage = pageIndex;
		// console.log(pageIndex);
		await getPagedData(pageIndex);
	}
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
	<Pager {sum} {hasNextPage} {hasPreviousPage} />
</AdminLayout>
