<script lang="ts">
	import { onMount, tick } from 'svelte';
	import SiteLayout from '../../../lib/components/SiteLayout.svelte';
	import type { Episode } from '$lib/models/episode';
	import WaveForm from '../../../lib/components/WaveForm.svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import 'cherry-markdown/dist/cherry-markdown.css';
	import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
	import { PUBLIC_FRONT_END_URL } from '$env/static/public';
	// import { Viewer } from 'bytemd';
	// import gfm from '@bytemd/plugin-gfm';
	// import 'github-markdown-css/github-markdown.css';

	let episodeData: Episode;
	let siteConfig: SiteConfig;
	export let data: any;
	let cherryInstance: Cherry;

	onMount(async () => {
		if (data != null) {
			episodeData = data.episode;
			cherryInstance = new Cherry({
				id: 'markdown-preview',
				isPreviewOnly: true
			});
			cherryInstance.setValue(episodeData.description);
			await tick();
			// audioFile = episodeData.audioFiles[0];
		}
	});
</script>

<svelte:head>
	<title
		>{episodeData == null ? '' : episodeData.title} - {siteConfig == null
			? ''
			: siteConfig.siteName}</title
	>
</svelte:head>

<SiteLayout>
	{#if episodeData != null}
		<h1 class="text-2xl m-10">
			{episodeData.title}
		</h1>
		{#if episodeData.audioFileName != null && episodeData.audioFileName.length > 0}
			<div class="card lg:card-side bg-base-100 shadow-xl m-10">
				<img
					class="w-80 h-80"
					src={episodeData.thumbnailFileName
						? PUBLIC_FRONT_END_URL + '/api/thumbnail/' + episodeData.thumbnailFileName
						: '/EpisodeDefaultThumbnailSquare.png'}
					alt={episodeData.title}
				/>

				<div class="card-body">
					<WaveForm fileUrl="{PUBLIC_FRONT_END_URL}/api/audioFile/{episodeData.audioFileName}" />
				</div>
			</div>
		{/if}
		<article class="markdown-body">
			<div id="markdown-preview"></div>
			<!-- <Viewer value={episodeData.description} {plugins} /> -->
		</article>
		<!-- {episodeData.description} -->
	{/if}
</SiteLayout>

<style>
	.markdown-body {
		box-sizing: border-box;
		/* min-width: 200px;
		max-width: 980px; */
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
