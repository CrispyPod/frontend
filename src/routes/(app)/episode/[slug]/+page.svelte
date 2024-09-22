<script lang="ts">
	import { browser } from '$app/environment';
	import WaveForm from '$lib/components/WaveForm.svelte';
	import { COLLECTION_EPISODE, COLLECTION_SITE_CONFIG } from '$lib/pb-integrate/pb_client';

	export let data: any;
</script>

<svelte:head>
	<title>{data.episode == null ? '' : data.episode.title}</title>
	<!-- <meta name="description" content={`${data.siteConfig.siteDescription}`} />
	<meta name="keywords" content={`${data.siteConfig.siteName}, ${data.episode.title}`} />
	<meta name="author" content={`${data.episode.authorName}`} /> -->
</svelte:head>

<div class="w-full flex justify-center items-center mt-10 mx-2">
	<div class="container">
		{#if data != null}
			<h1 class="text-3xl text-center">
				{data.episode.title}
			</h1>
			{#if data.episode.audio_file != null && data.episode.audio_file.length > 0}
				<div class="card lg:card-side bg-base-100 shadow-xl my-10 mr-6">
					<figure>
						<img
							class="w-80 h-80"
							src={data.episode.thumbnail != null && data.episode.thumbnail.length > 0
								? `/files/${COLLECTION_EPISODE}/${data.episode.id}/${data.episode.thumbnail}`
								: `/files/${COLLECTION_SITE_CONFIG}/${data.siteConfig.id}/${data.siteConfig.default_thumbnail}`}
							alt={data.title}
						/>
					</figure>

					<div class="card-body">
						{#if browser}
							<WaveForm
								fileUrl={`/files/${COLLECTION_EPISODE}/${data.episode.id}/${data.episode.audio_file}`}
							/>
						{/if}
						<a
							class="ml-auto"
							href={`/files/${COLLECTION_EPISODE}/${data.episode.id}/${data.episode.audio_file}`}
						>
							<button class="btn btn-accent">Download</button>
						</a>
					</div>
				</div>
			{/if}

			<div class="mx-auto prose">
				{@html data.episode.description}
			</div>
		{/if}
	</div>
</div>
