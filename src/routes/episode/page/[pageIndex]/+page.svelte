<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';
	import SiteLayout from '$lib/components/SiteLayout.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Episodes - {data.siteConfig.site_name}</title>
	<meta name="description" content={`${data.siteConfig.site_description}`} />
</svelte:head>

<SiteLayout>
	<div class="w-full container">
		<PagedEpisodes
			episodes={data.episodes.items}
			hasNextPage={data.episodes.page >= data.episodes.totalPage}
			hasPreviousPage={data.episodes.page > 1}
			sum={data.episodes.totalItems}
		/>
	</div>
</SiteLayout>
