<script lang="ts">
	import { onMount } from 'svelte';
	import SiteLayout from '../SiteLayout.svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { get } from 'svelte/store';
	import { siteConfigS } from '$lib/stores/siteConfigStore';

	let siteConfig: SiteConfig;

	onMount(async () => {
		await siteConfigS.init();
		siteConfig = get(siteConfigS);
	});
</script>

<svelte:head>
	<title>
		About - {siteConfig == null ? '' : siteConfig.siteName}
	</title>
</svelte:head>

<SiteLayout>
	<div class="hero w-full h-96">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<!-- <h1 class="text-5xl font-bold">{siteConfig == null ? '' : siteConfig.siteName}</h1> -->
				<!-- <h2 class="text-6xl">About</h2> -->
				<p class="py-6">{siteConfig == null ? '' : siteConfig.siteDescription}</p>
				<!-- <button class="btn btn-primary">Get Started</button> -->
			</div>
		</div>
	</div>
</SiteLayout>
