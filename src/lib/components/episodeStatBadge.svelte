<script lang="ts">
	import { EpisodeState } from '$lib/models/episode';

	export let episodeStatus: EpisodeState;
</script>

{#if episodeStatus == EpisodeState.draft}
	<div class="badge badge-neutral">Draft</div>
{:else if episodeStatus == EpisodeState.published}
	<div class="badge badge-accent">Published</div>
{/if}
