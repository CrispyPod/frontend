<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	let siteConfig: SiteConfig;
	onMount(async () => {
		await siteConfigS.init();
		siteConfig = get(siteConfigS);
	});
</script>

<svelte:head>
	{#if siteConfig != null && siteConfig.siteIconFile != null}
		<link rel="icon" href={'/api/imageFile/' + siteConfig.siteIconFile} />
	{:else}
		<link rel="icon" href="/favicon.png" />
	{/if}

	{#if $page.data.headAnalytics != null}
		{@html $page.data.headAnalytics}
	{/if}
</svelte:head>

<slot />

{#if $page.data.footerAnalytics != null}
	{@html $page.data.footerAnalytics}
{/if}
