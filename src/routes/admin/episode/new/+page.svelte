<script lang="ts">
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import { goto } from '$app/navigation';
	import type { Episode } from '$lib/models/episode';
	import CreateEpisodeData from '$lib/components/admin-episode/CreateEpisodeData.svelte';
	import Steps from '$lib/components/admin-episode/Steps.svelte';
	import UploadAudioFile from '$lib/components/admin-episode/UploadAudioFile.svelte';
	import UploadThumbnail from '$lib/components/admin-episode/UploadThumbnail.svelte';
	import Visibility from '$lib/components/admin-episode/Visibility.svelte';

	let episodeData: Episode | null = null;
	let steps = 0;

	let curStepComponent = CreateEpisodeData;

	function next(e: Episode) {
		episodeData = e;
		steps += 1;
		if (steps > 3) {
			goto('/admin/episode');
		}
	}
	$: if (steps) {
		switch (steps) {
			default:
			case 0:
				curStepComponent = CreateEpisodeData;
				break;
			case 1:
				curStepComponent = UploadAudioFile;
				break;
			case 2:
				curStepComponent = UploadThumbnail;
				break;
			case 3:
				curStepComponent = Visibility;
				break;
		}
	}
</script>

<AdminLayout pageTitle="New Episode">
	<div class="flex justify-center items-center">
		<Steps curStep={steps} />
	</div>
	<div class="mt-8">
		<svelte:component
			this={curStepComponent}
			{episodeData}
			handleNext={next}
		/>
	</div>
</AdminLayout>
