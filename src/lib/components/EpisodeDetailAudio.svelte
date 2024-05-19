<script lang="ts">
	import { PUBLIC_PB_ENDPOINT } from '$env/static/public';
	import type { Episode } from '$lib/models/episode';
	import { COLLECTION_EPISODE } from '$lib/pb-integrate/pb_client';
	import WaveForm from './WaveForm.svelte';

	export let episodeData: Episode;
</script>

{#if episodeData != null}
	{#if episodeData.audio_file != null && episodeData.audio_file.length > 0}
		<div class="card lg:card-side bg-base-100 shadow-xl my-10 mr-6">
			<figure>
				<img
					class="w-80 h-80"
					src={`${PUBLIC_PB_ENDPOINT}api/files/${COLLECTION_EPISODE}/${episodeData.id}/${episodeData.thumbnail}`}
					alt={episodeData.title}
				/>
			</figure>

			<div class="card-body">
				<WaveForm
					fileUrl={`${PUBLIC_PB_ENDPOINT}api/files/${COLLECTION_EPISODE}/${episodeData.id}/${episodeData.audio_file}`}
				/>
			</div>
		</div>
	{/if}

	<div class="mr-6">
		<div id="markdown-preview"></div>
	</div>
{/if}
