<script lang="ts">
	import { browser } from '$app/environment';
	import WaveForm from '$lib/components/WaveForm.svelte';
	import { COLLECTION_EPISODE, COLLECTION_SITE_CONFIG } from '$lib/pb-integrate/pb_client';
	import { Card, Heading } from 'flowbite-svelte';
	import { Section } from 'flowbite-svelte-blocks';

	export let data: any;
</script>

<svelte:head>
	<title>{data.episode == null ? '' : data.episode.title}</title>
	<!-- <meta name="description" content={`${data.siteConfig.siteDescription}`} />
	<meta name="keywords" content={`${data.siteConfig.siteName}, ${data.episode.title}`} />
	<meta name="author" content={`${data.episode.authorName}`} /> -->
</svelte:head>

<!-- <Section>
	<div
		class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
	>
		<img
			class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
			src={data.episode.thumbnail != null && data.episode.thumbnail.length > 0
				? `/files/${COLLECTION_EPISODE}/${data.episode.id}/${data.episode.thumbnail}`
				: `/files/${COLLECTION_SITE_CONFIG}/${data.siteConfig.id}/${data.siteConfig.default_thumbnail}`}
			alt=""
		/>
		<div class="flex flex-col justify-between p-4 leading-normal">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Noteworthy technology acquisitions 2021
			</h5>
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.
			</p>
		</div>
	</div>
</Section> -->

<Section>
	<Card
		horizontal
		size="xl"
		img={data.episode.thumbnail != null && data.episode.thumbnail.length > 0
			? `/files/${COLLECTION_EPISODE}/${data.episode.id}/${data.episode.thumbnail}`
			: `/files/${COLLECTION_SITE_CONFIG}/${data.siteConfig.id}/${data.siteConfig.default_thumbnail}`}
	>
		<Heading>
			{data.episode.title}
		</Heading>
		<div>
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
	</Card>
</Section>

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

			<div class="mr-6 prose">
				{@html data.episode.description}
			</div>
		{/if}
	</div>
</div>
