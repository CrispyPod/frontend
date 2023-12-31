<script lang="ts">
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let siteName: string = '';

	onMount(async () => {
		await siteConfigS.init();
		const siteConfi = get(siteConfigS);
		siteName = siteConfi.siteName;
	});
</script>

<div class="w-full flex justify-center items-center">
	<div class="container">
		<div class="navbar">
			<div class="flex-1">
				<a class="btn btn-ghost normal-case text-xl" href="/">{siteName}</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a href="/episode">Episodes</a></li>

					<li><a href="/about">About</a></li>
					<li><a href="/rss">RSS</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>
