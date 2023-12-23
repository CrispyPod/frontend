<script lang="ts">
	import PagedEpisodes from './PagedEpisodes.svelte';
	import SiteLayout from './SiteLayout.svelte';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import { onMount } from 'svelte';
	import type { Episode } from '$lib/models/episode';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import Header from './Header.svelte';

	let episodes: Array<Episode> | null = null;
	let siteName: string = '';
	let siteDescription: string = '';

	let sum = 0;
	let hasNextPage = false;
	let hasPreviousPage = false;

	onMount(async () => {
		getEpisodes();
	});

	siteConfigS.subscribe((v) => {
		if (v != null) {
			siteName = v.siteName;
			siteDescription = v.siteDescription;
		}
	});

	async function getEpisodes() {
		let result = await graphqlRequest(
			null,
			`query{
  episodes(pagination: {pageIndex: 1, perPage: 10}){
    items{
      id,
      title,
	  description,
      createTime,
      thumbnailFileName,
    },
    totalCount,
    pageInfo{
      hasNextPage,
      hasPreviousPage
    },
  } 
}`
		);

		let json_resp = await result.json();
		episodes = json_resp.data.episodes.items;

		hasPreviousPage = json_resp.data.episodes.pageInfo.hasPreviousPage ?? false;
		hasNextPage = json_resp.data.episodes.pageInfo.hasNextPage ?? false;
		sum = json_resp.data.episodes.totalCount ?? 0;
	}
</script>

<svelte:head>
	<title>{siteName}</title>
</svelte:head>

<SiteLayout showHeader={false}>
	<div class="w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-base-100">
		<Header />
		<div class="hero h-full">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">{siteName}</h1>
					<p class="py-6">{siteDescription}</p>
					<!-- <button class="btn btn-primary">Get Started</button> -->
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="divider" /> -->
	{#if episodes != null}
		<div class="container mx-auto mt-5">
			<div class="w-full flex justify-center">Episodes</div>
			<PagedEpisodes {episodes} {hasNextPage} {hasPreviousPage} {sum} />
		</div>
	{/if}
</SiteLayout>
