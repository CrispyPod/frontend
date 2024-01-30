<script lang="ts">
	import type { Episode } from '$lib/models/episode';

	export let episode: Episode;
</script>

<div class="w-full flex justify-center">
	<a href={episode.namedLink == undefined ? 'javascript:;' : `/episode/${episode.namedLink}`}>
		<div class="card w-64 md:w-96 shadow-xl m-10 bg-base-200">
			<figure>
				<img src={episode.thumbnailFileName} alt={episode.title} />
			</figure>
			<div class="card-body">
				<h2 class="card-title">
					{episode.title}
					<!-- <div class="badge badge-secondary">NEW</div> -->
				</h2>
				<div class="card-actions justify-end">
					<div class="badge badge-outline">
						{new Date(episode.createTime * 1000).toLocaleDateString()}
					</div>
				</div>
			</div>
		</div>
	</a>
</div>
