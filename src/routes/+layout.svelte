<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { COLLECTION_SITE_CONFIG } from '$lib/pb-integrate/pb_client';
	import { PUBLIC_PB_ENDPOINT } from '$env/static/public';

	let siteConfig = $page.data.siteConfig;
</script>

<svelte:head>
	{#if siteConfig != null && siteConfig.site_icon.length > 0}
		<link
			rel="icon"
			href={`${PUBLIC_PB_ENDPOINT}api/files/${COLLECTION_SITE_CONFIG}/${siteConfig.id}/${siteConfig.site_icon}`}
		/>
	{:else}
		<link rel="icon" href="/favicon.ico" />
	{/if}

	{#if $page.data.headAnalytics != null}
		{@html decodeURI($page.data.headAnalytics)}
	{/if}
</svelte:head>

<slot />

{#if $page.data.footerAnalytics != null}
	{@html decodeURI($page.data.footerAnalytics)}
{/if}
