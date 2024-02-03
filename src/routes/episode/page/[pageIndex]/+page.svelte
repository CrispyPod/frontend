<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';
	import SiteLayout from '$lib/components/SiteLayout.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Episodes - {data.siteName == null ? '' : data.siteName}</title>
	<meta name="description" content={`${data.siteDescription}`} />
	<meta name="keywords" content={data.siteName} />
</svelte:head>

<SiteLayout>
	<PagedEpisodes
		episodes={data.episodes}
		curPage={data.curPage}
		sum={data.sum}
		hasNextPage={data.hasNextPage}
		hasPreviousPage={data.hasPreviousPage}
	/>
</SiteLayout>
