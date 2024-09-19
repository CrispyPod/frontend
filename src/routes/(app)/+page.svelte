<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import { Section, News, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>{data.siteConfig.site_name}</title>
	<meta name="description" content={`${data.siteConfig.site_description}`} />
</svelte:head>

<Section name="heroDefault">
	<!-- <News>
			<span class="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span>
			<span class="text-sm font-medium">Flowbite is out! See what's new</span>
		</News> -->
	<HeroHeader>
		<svelte:fragment slot="h1">Welcome to {data.siteConfig.site_name}</svelte:fragment>
		<svelte:fragment slot="paragraph">{data.siteConfig.site_description}</svelte:fragment>
	</HeroHeader>

	<!-- <div
		class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
	>
		<a href="/">
			<Button size="lg" color="red">
				Learn more <ArrowRightOutline size="md" class="ml-2 -mr-1" />
			</Button>
		</a>
		<a href="/">
			<Button size="lg" color="light">
				<VideoCameraSolid size="xs" class="mr-2 -ml-1" />
				Watch video
			</Button>
		</a>
	</div> -->

	<!-- <HeroBody>
			<svelte:fragment slot="head">FEATURED IN</svelte:fragment>

			<div class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
				<a href="/" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
					<Youtube />
				</a>
				<a href="/" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
					<ProductHunt />
				</a>
				<a href="/" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
					<Reddit />
				</a>
			</div>
		</HeroBody> -->
</Section>
<!-- <div class="w-full h-[80vh] bg-gradient-to-r from-cyan-500 to-blue-500 text-base-100">
		<Header />
		<div class="hero h-full">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">{data.siteConfig.site_name}</h1>
					<p class="py-6">{data.siteConfig.site_description}</p>
				</div>
			</div>
		</div>
	</div> -->

<Section>
	{#if data.episodes != null}
		<PagedEpisodes data={data.episodes} />
	{:else}
		<!-- <a href="/episode/abc"></a> -->
	{/if}
</Section>
