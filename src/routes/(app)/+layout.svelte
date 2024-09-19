<script lang="ts">
	import '../../app.css';
	import { page } from '$app/stores';
	import { COLLECTION_SITE_CONFIG } from '$lib/pb-integrate/pb_client';
	import { NavBrand, Navbar, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';

	let siteConfig = $page.data.siteConfig;

	let siteName: string;
	siteName = $page.data.siteConfig.site_name;
</script>

<svelte:head>
	{#if siteConfig != null && siteConfig.site_icon.length > 0}
		<link
			rel="icon"
			href={`/files/${COLLECTION_SITE_CONFIG}/${siteConfig.id}/${siteConfig.site_icon}`}
		/>
	{:else}
		<link rel="icon" href="/favicon.ico" />
	{/if}

	{#if $page.data.headAnalytics != null}
		{@html decodeURI($page.data.headAnalytics)}
	{/if}
</svelte:head>

<Navbar>
	<NavBrand href="/">
		<!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>{siteName}</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/episode/page/1">Episodes</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/rss.xml">RSS</NavLi>
	</NavUl>
</Navbar>

<slot />

{#if $page.data.footerAnalytics != null}
	{@html decodeURI($page.data.footerAnalytics)}
{/if}
