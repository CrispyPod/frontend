<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Episodes - {data.siteConfig.site_name}</title>
	<meta name="description" content={`${data.siteConfig.site_description}`} />
</svelte:head>

<PagedEpisodes data={data.episodes} />
