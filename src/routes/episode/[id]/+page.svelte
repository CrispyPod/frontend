<script lang="ts">
	import { onMount, tick } from 'svelte';
	import SiteLayout from '../../SiteLayout.svelte';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import type { Episode } from '$lib/models/episode';
	import WaveForm from '../../WaveForm.svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { get } from 'svelte/store';
	import { Viewer } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import 'github-markdown-css/github-markdown.css';

	let episodeData: Episode;
	let siteConfig: SiteConfig;
	export let data;
	const plugins = [gfm()];

	onMount(async () => {
		await siteConfigS.init();
		siteConfig = get(siteConfigS);
		const result = await graphqlRequest(
			null,
			`{episode(id:"` +
				data.id +
				`"){id,title,createTime,description,audioFileName,audioFileDuration}}`
		);
		const jsonResp = await result.json();
		if (jsonResp.data != null) {
			episodeData = jsonResp.data.episode;
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
						? '/api/thumbnail/' + episodeData.thumbnailFileName
						: '/EpisodeDefaultThumbnailSquare.png'}
					alt={episodeData.title}
				/>

				<div class="card-body">
					<WaveForm fileUrl="/api/audioFile/{episodeData.audioFileName}" />
				</div>
			</div>
		{/if}
		<article class="markdown-body">
			<Viewer value={episodeData.description} {plugins} />
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
