<script lang="ts">
	import type { Episode } from '$lib/models/episode';
	import { get } from 'svelte/store';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { onMount } from 'svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { PUBLIC_PB_ENDPOINT } from '$env/static/public';
	import EpisodeListItem from '../EpisodeListItem.svelte';
	import EpisodeDetailAudio from '../EpisodeDetailAudio.svelte';
	import { COLLECTION_EPISODE, pb } from '$lib/pb-integrate/pb_client';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';

	export let episodeData: Episode | null;
	export let handleNext: (e: Episode) => any;

	let canClickNext: boolean = false;
	let errMessage: string | null = null;
	let uploading: boolean = false;

	let thumbnailFileList: FileList;
	// Note that `fileList` is of type `FileList`, not an Array:
	// https://developer.mozilla.org/en-US/docs/Web/API/FileList

	$: thumbnailFileList && uploadThumbnail();

	function checkCanClickNext() {
		canClickNext = episodeData?.thumbnail != null && episodeData?.thumbnail?.length > 0;
	}

	$: episodeData && checkCanClickNext();

	let siteConfig: SiteConfig;

	onMount(async () => {
		await siteConfigS.init();
		siteConfig = get(siteConfigS);
	});

	async function uploadThumbnail() {
		const formData = new FormData();
		let file = thumbnailFileList.item(0);
		formData.append('thumbnail', file!);
		pb.collection(COLLECTION_EPISODE)
			.update(episodeData!.id, formData)
			.then((v) => {
				episodeData = v as unknown as Episode;
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}

	async function onNext() {
		handleNext(episodeData!);
	}

	function handleReupload() {
		episodeData!.thumbnail = null;
	}
</script>

<div class="flex flex-col justify-center items-center">
	{#if episodeData == null || episodeData.thumbnail == null || episodeData.thumbnail.length == 0}
		<div>
			<p>Upload thumbnail</p>
			<input
				id="afUpload"
				type="file"
				accept=".png,.jpeg,.jpg"
				bind:files={thumbnailFileList}
				class="file-input file-input-bordered w-full max-w-xs"
			/>
		</div>
	{:else}
		<div class="w-full">
			<p class="text-center">This is what will display in episode page.</p>
			<EpisodeListItem
				linked={false}
				episode={{
					...episodeData,
					thumbnailFileName: `/api/files/${COLLECTION_EPISODE}/${episodeData.id}/${episodeData.thumbnail}`
				}}
			/>
			<EpisodeDetailAudio {episodeData} />

			<div class="w-full flex">
				<button
					class="btn btn-outline btn-secondary ml-auto"
					on:click|preventDefault={handleReupload}>Reuplaod</button
				>
			</div>
		</div>
	{/if}
</div>
<div class="mt-6 flex items-center justify-end gap-x-6">
	<a href="/admin/episode" type="button" class="btn btn-active">Cancel</a>
	{#if uploading}
		<button class="btn btn-info">
			<span class="loading loading-spinner loading-md" />Uploading</button
		>
	{:else}
		<button
			type="submit"
			class="btn btn-active btn-primary {canClickNext ? '' : 'btn-disabled'}"
			on:click={onNext}>Next</button
		>
	{/if}
</div>
