<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { onMount } from 'svelte';

	export let data: any;
	onMount(() => {
		siteConfigS.set(data.siteConfig);
	});
</script>

<svelte:head>
	<title>Episodes - {data.siteConfig.site_name}</title>
	<meta name="description" content={`${data.siteConfig.site_description}`} />
</svelte:head>

<PagedEpisodes data={data.episodes} />
