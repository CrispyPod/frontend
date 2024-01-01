<script lang="ts">
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import EpisodeItem from '$lib/components/EpisodeItem.svelte';
	import Pager from '$lib/components/Pager.svelte';

	export let data: any;
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
		{#each data.episodes as p, i}
			<EpisodeItem episode={p} />
		{/each}
	</ul>
	<Pager
		sum={data.sum}
		hasNextPage={data.hasNextPage}
		hasPreviousPage={data.hasPreviousPage}
		pagePrefix="/admin/episode/page/"
	/>
</AdminLayout>
