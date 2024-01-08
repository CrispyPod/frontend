<script lang="ts">
	import type { Episode } from '$lib/models/episode';
	import Pager from './Pager.svelte';

	export let episodes: Array<Episode> = [];
	export let curPage: number = 1;

	export let sum = 0;
	export let hasNextPage = false;
	export let hasPreviousPage = false;
</script>

<div class="grid lg:grid-cols-2">
	{#each episodes as e}
		<div class="w-full flex justify-center">
			<a href="/episode/{e.id}">
				<div class="card w-64 md:w-96 shadow-xl m-10 bg-base-200">
					<figure>
						<img src={e.thumbnailFileName} alt={e.title} />
					</figure>
					<div class="card-body">
						<h2 class="card-title">
							{e.title}
							<!-- <div class="badge badge-secondary">NEW</div> -->
						</h2>
						<div class="card-actions justify-end">
							<div class="badge badge-outline">
								{new Date(e.createTime * 1000).toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>

<Pager {sum} {hasNextPage} {hasPreviousPage} {curPage} />
