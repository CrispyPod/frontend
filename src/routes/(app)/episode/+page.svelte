<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';
	import { Section } from 'flowbite-svelte-blocks';

	export let data: any;
</script>

<svelte:head>
	<title>Episodes - {data.siteConfig.site_name}</title>
	<meta name="description" content={`${data.siteConfig.site_description}`} />
</svelte:head>

<Section>
	<PagedEpisodes data={data.episodes} />
</Section>
