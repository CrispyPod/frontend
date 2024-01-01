<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';
	import SiteLayout from '$lib/components/SiteLayout.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Episodes - {data.siteConfig == null ? '' : data.siteConfig.siteName}</title>
</svelte:head>

<SiteLayout>
	<div class="w-full container">
		<PagedEpisodes
			siteUrl={data.siteUrl}
			episodes={data.episodes}
			curPage={1}
			sum={data.sum}
			hasNextPage={data.hasNextPage}
			hasPreviousPage={data.hasPreviousPage}
		/>
	</div>
</SiteLayout>
