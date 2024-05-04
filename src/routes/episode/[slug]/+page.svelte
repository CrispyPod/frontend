<script lang="ts">
	import { onMount, tick } from 'svelte';
	import SiteLayout from '$lib/components/SiteLayout.svelte';
	import WaveForm from '$lib/components/WaveForm.svelte';
	import 'cherry-markdown/dist/cherry-markdown.css';
	import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
	import { browser } from '$app/environment';

	export let data: any;
	let cherryInstance: Cherry;

	onMount(async () => {
		console.log(data);
		if (browser && data != null) {
			// trigger update hook since episodeData updated
			await tick();
			cherryInstance = new Cherry({
				id: 'markdown-preview',
				isPreviewOnly: true,
				value: data.description ?? ''
			});
		}
	});
</script>

<svelte:head>
	<title
		>{data == null ? '' : data.title}</title
	>
	<!-- <meta name="description" content={`${data.siteConfig.siteDescription}`} />
	<meta name="keywords" content={`${data.siteConfig.siteName}, ${data.episode.title}`} />
	<meta name="author" content={`${data.episode.authorName}`} /> -->
</svelte:head>

<SiteLayout>
	<div class="w-full flex justify-center items-center mt-10 mx-2">
		<div class="container">
			{#if data != null}
				<h1 class="text-3xl text-center">
					{data.title}
				</h1>
				{#if data.audioFileName != null && data.audioFileName.length > 0}
					<div class="card lg:card-side bg-base-100 shadow-xl my-10 mr-6">
						<figure>
							<img
								class="w-80 h-80"
								src={data.thumbnailFileName != null &&
								data.thumbnailFileName.length > 0
									? data.thumbnailFileName
									: `/api/imageFile/${data.siteConfig.defaultThumbnail}`}
								alt={data.title}
							/>
						</figure>

						<div class="card-body">
							<WaveForm fileUrl={data.audioFileName} />
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
