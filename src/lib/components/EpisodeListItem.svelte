<script lang="ts">
	export let episode: any;
</script>

<div class="w-full flex justify-center">
	<a href={episode.slug == undefined ? 'javascript:;' : `/episode/${episode.slug}`}>
		<div class="card w-64 md:w-96 shadow-xl m-10 bg-base-200">
			<figure>
				<img src={episode.thumbnail} alt={episode.title} />
			</figure>
			<div class="card-body">
				<h2 class="card-title">
					{episode.title}
				</h2>
			</div>
		</div>
	</a>
</div>
