<script lang="ts">
	import { onMount, tick } from 'svelte';
	import SiteLayout from '$lib/components/SiteLayout.svelte';
	import type { Episode } from '$lib/models/episode';
	import WaveForm from '$lib/components/WaveForm.svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import 'cherry-markdown/dist/cherry-markdown.css';
	import Cherry from 'cherry-markdown/dist/cherry-markdown.core';

	let episodeData: Episode;
	let siteConfig: SiteConfig;
	export let data: any;
	let cherryInstance: Cherry;

	onMount(async () => {
		if (data != null) {
			episodeData = data.episode;
			// trigger update hook since episodeData updated
			await tick();
			cherryInstance = new Cherry({
				id: 'markdown-preview',
				isPreviewOnly: true,
				value: episodeData.description,
			});
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
	<div class="w-full flex justify-center items-center mt-10 mx-2">
		<div class="container">
			{#if episodeData != null}
				<h1 class="text-3xl text-center">
					{episodeData.title}
				</h1>
				{#if episodeData.audioFileName != null && episodeData.audioFileName.length > 0}
					<div class="card lg:card-side bg-base-100 shadow-xl my-10 mr-6">
						<figure>
							<img
								class="w-80 h-80"
								src={episodeData.thumbnailFileName
									? data.siteConfig.siteUrl + '/api/thumbnail/' + episodeData.thumbnailFileName
									: '/EpisodeDefaultThumbnailSquare.png'}
								alt={episodeData.title}
							/>
						</figure>

						<div class="card-body">
							<WaveForm
								fileUrl="{data.siteConfig.siteUrl}/api/audioFile/{episodeData.audioFileName}"
							/>
						</div>
					</div>
				{/if}

				<div class="mr-6">
					<div id="markdown-preview"></div>
				</div>
			{/if}
		</div>
	</div>
</SiteLayout>
