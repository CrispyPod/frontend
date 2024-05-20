<script lang="ts">
	import SiteLayout from '$lib/components/SiteLayout.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>
		About - {data.siteConfig.site_name}
	</title>
	<meta name="description" content={`${data.siteConfig.site_description}`} />
</svelte:head>

<SiteLayout>
	<div class="hero w-full h-96">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<!-- <h1 class="text-5xl font-bold">{siteConfig == null ? '' : siteConfig.siteName}</h1> -->
				<!-- <h2 class="text-6xl">About</h2> -->
				<p class="py-6">{data.siteConfig.site_description}</p>
				<!-- <button class="btn btn-primary">Get Started</button> -->
			</div>
		</div>
	</div>
</SiteLayout>
