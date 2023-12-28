<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';
	import SiteLayout from '$lib/components/SiteLayout.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Episodes - {data.siteConfig == null ? '' : data.siteConfig.siteName}</title>
</svelte:head>

<SiteLayout>
	<PagedEpisodes
		siteUrl={data.siteUrl}
		episodes={data.episodes}
		curPage={data.curPage}
		sum={data.sum}
		hasNextPage={data.hasNextPage}
		hasPreviousPage={data.hasPreviousPage}
	/>
</SiteLayout>
