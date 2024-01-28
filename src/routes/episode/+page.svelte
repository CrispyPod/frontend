<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';
	import SiteLayout from '$lib/components/SiteLayout.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Episodes - {data.siteName == null ? '' : data.siteName}</title>
</svelte:head>

<SiteLayout>
	<div class="w-full container">
		<PagedEpisodes
			episodes={data.episodes}
			curPage={1}
			sum={data.sum}
			hasNextPage={data.hasNextPage}
			hasPreviousPage={data.hasPreviousPage}
		/>
	</div>
</SiteLayout>
