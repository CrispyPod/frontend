<script lang="ts">
	import type { Episode } from '$lib/models/episode';
	import WaveForm from './WaveForm.svelte';

	export let episodeData: Episode;
</script>

{#if episodeData != null}
	{#if episodeData.audioFileName != null && episodeData.audioFileName.length > 0}
		<div class="card lg:card-side bg-base-100 shadow-xl my-10 mr-6">
			<figure>
				<img
					class="w-80 h-80"
					src={`/api/imageFile/${episodeData.thumbnailFileName}`}
					alt={episodeData.title}
				/>
			</figure>

			<div class="card-body">
				<WaveForm fileUrl={`/api/audioFile/${episodeData.audioFileName}`} />
			</div>
		</div>
	{/if}

	<div class="mr-6">
		<div id="markdown-preview"></div>
	</div>
{/if}
