<script lang="ts">
	import { graphqlRequest } from '$lib/graphqlRequest';
	import type { Episode } from '$lib/models/episode';
	import { onMount } from 'svelte';
	import Pager from './Pager.svelte';

	export let episodes: Array<Episode> = [];
	export let shouldFirstLoad: boolean = false;

	export let sum = 0;
	let perPage = 10;
	export let hasNextPage = false;
	export let hasPreviousPage = false;

	onMount(() => {
		if (shouldFirstLoad) {
			getEpisodes(0);
		}
	});

	async function getEpisodes(newPage: number) {
		let result = await graphqlRequest(
			null,
			`{
				episodes(pagination: {pageIndex:` +
				newPage +
				`, perPage: ` +
				perPage +
				`}){
    items{
      id,
      title,
	  description,
      createTime,
      thumbnailFileName,
    },
    totalCount,
    pageInfo{
      hasNextPage,
      hasPreviousPage
    },
  } 
}`
		);

		let json_resp = await result.json();
		hasPreviousPage = json_resp.data.episodes.pageInfo.hasPreviousPage ?? false;
		hasNextPage = json_resp.data.episodes.pageInfo.hasNextPage ?? false;
		sum = json_resp.data.episodes.totalCount ?? 0;
		episodes = json_resp.data.episodes.items;
	}

	async function handlePageChange(pageIndex: number) {
		// curPage = pageIndex;
		console.log(pageIndex);
		await getEpisodes(pageIndex);
	}
</script>

<div class="grid lg:grid-cols-2">
	{#each episodes as e}
		<div class="w-full flex justify-center">
			<a href="/episode/{e.id}">
				<div class="card w-64 md:w-96 shadow-xl m-10 bg-base-200">
					<figure>
						<img
							src={e.thumbnailFileName
								? '/api/thumbnail/' + e.thumbnailFileName
								: '/EpisodeDefaultThumbnailSquare.png'}
							alt={e.title}
						/>
					</figure>
					<div class="card-body">
						<h2 class="card-title">
							{e.title}
							<!-- <div class="badge badge-secondary">NEW</div> -->
						</h2>
						<div class="card-actions justify-end">
							<div class="badge badge-outline">{new Date(e.createTime*1000).toLocaleDateString()}</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>

<Pager {handlePageChange} {sum} {perPage} {hasNextPage} {hasPreviousPage} />
