<script lang="ts">
	import { Icon, Pencil, Radio } from 'svelte-hero-icons';
	import EpisodeStatBadge from './episodeStatBadge.svelte';
	import type { Episode } from '$lib/models/episode';
	export let episode: Episode;
</script>

<li class="flex justify-between gap-x-6 py-5">
	<div class="flex gap-x-4">
		<Icon src={Radio} size="48" />
		<div class="min-w-0 flex-auto">
			<p class="text-sm font-semibold leading-6 text-gray-900">{episode.title}</p>
			<EpisodeStatBadge episodeStatus={episode.episodeStatus} />
		</div>
	</div>
	<div class="sm:flex sm:flex-col sm:items-end">
		<a class="sm:ml-3" href="/admin/episode/{episode.id}">
			<button class="btn btn-active"> <Icon src={Pencil} size="16" />Edit</button>
		</a>
	</div>
</li>
