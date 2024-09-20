<script lang="ts">
	import '../../app.css';
	import { page } from '$app/stores';
	import { COLLECTION_SITE_CONFIG } from '$lib/pb-integrate/pb_client';
	import {
		NavBrand,
		Navbar,
		NavHamburger,
		NavUl,
		NavLi,
		Footer,
		FooterBrand,
		FooterLinkGroup,
		FooterLink
	} from 'flowbite-svelte';

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

<div class="min-h-screen flex flex-col justify-between">
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

	<Footer footerType="socialmedia">
		<div class="mx-auto max-w-screen-xl text-center">
			<FooterBrand
				href="/"
				name={siteName}
				aClass="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
			/>
			<p class="my-6 text-gray-500 dark:text-gray-400">
				<!-- Open-source library of over 400+ web components and interactive elements built for better web. -->
				{siteConfig.site_description}
			</p>
			<FooterLinkGroup
				ulClass="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white"
			>
				<FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/episode/page/1"
					>Episodes</FooterLink
				>
				<FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/about">About</FooterLink
				>
				<FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/rss.xml">RSS</FooterLink
				>
				<!-- <FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/">Blog</FooterLink>
			<FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/"
				>Affiliate Program</FooterLink
			>
			<FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/">FAQs</FooterLink>
			<FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/">Contact</FooterLink> -->
			</FooterLinkGroup>
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				<a href="/" class="hover:underline">{siteName}</a>. All Rights Reserved.
			</span>
		</div>
	</Footer>

	{#if $page.data.footerAnalytics != null}
		{@html decodeURI($page.data.footerAnalytics)}
	{/if}
</div>
