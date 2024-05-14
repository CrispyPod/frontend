<script lang="ts">
	import PagedEpisodes from '$lib/components/PagedEpisodes.svelte';
	import SiteLayout from '$lib/components/SiteLayout.svelte';
	import Header from '$lib/components/Header.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>{data.siteConfig.site_name}</title>
	<meta name="description" content={`${data.siteConfig.site_description}`} />
</svelte:head>

<SiteLayout showHeader={false}>
	<div class="w-full h-[80vh] bg-gradient-to-r from-cyan-500 to-blue-500 text-base-100">
		<Header />
		<div class="hero h-full">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">{data.siteConfig.site_name}</h1>
					<p class="py-6">{data.siteConfig.site_description}</p>
					<!-- <button class="btn btn-primary">Get Started</button> -->
				</div>
			</div>
		</div>
	</div>
	{#if data.episodes != null}
		<div class="w-full container mt-5">
			<PagedEpisodes
				episodes={data.episodes.items}
				hasNextPage={data.episodes.page >= data.episodes.totalPage}
				hasPreviousPage={data.episodes.page >= 1}
				sum={data.episodes.totalItems}
			/>
		</div>
	{:else}
		<!-- <a href="/episode/abc"></a> -->
	{/if}
</SiteLayout>
