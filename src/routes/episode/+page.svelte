<script lang="ts">
	import { onMount } from 'svelte';
	import PagedEpisodes from '../PagedEpisodes.svelte';
	import SiteLayout from '../SiteLayout.svelte';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { get } from 'svelte/store';
	import type { SiteConfig } from '$lib/models/siteConfig';

	let siteConfig: SiteConfig;

	onMount(async () => {
		await siteConfigS.init();
		siteConfig = get(siteConfigS);
	});
</script>

<svelte:head>
	<title>Episodes - {siteConfig == null ? '' : siteConfig.siteName}</title>
</svelte:head>

<SiteLayout>
	<PagedEpisodes shouldFirstLoad={true} />
</SiteLayout>
