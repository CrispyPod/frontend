<script lang="ts">
	import type { Episode } from '$lib/models/episode';
	import WaveForm from '$lib/components/WaveForm.svelte';
	import { COLLECTION_EPISODE, backend_pb } from '$lib/pb-integrate/admin_pb';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';

	export let episodeData: Episode | null;
	export let handleNext: (e: Episode) => any;

	let canClickNext: boolean = false;
	let errMessage: string | null = null;
	let uploading: boolean = false;

	let audioFileList: FileList;
	// Note that `fileList` is of type `FileList`, not an Array:
	// https://developer.mozilla.org/en-US/docs/Web/API/FileList

	$: audioFileList && uploadAudioFile();

	function checkCanClickNext() {
		canClickNext = episodeData?.audio_file != null && episodeData?.audio_file?.length > 0;
	}

	$: episodeData && checkCanClickNext();

	async function uploadAudioFile() {
		errMessage = '';
		const formData = new FormData();
		let file = audioFileList.item(0);
		formData.append('audio_file', file!);
		backend_pb.collection(COLLECTION_EPISODE)
			.update(episodeData!.id, formData)
			.then((v) => {
				episodeData = v as unknown as Episode;
				canClickNext = true;
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}

	async function onNext() {
		handleNext(episodeData!);
	}

	function handleReupload() {
		episodeData!.audio_file = null;
	}
</script>

<div class="flex flex-col justify-center items-center">
	{#if episodeData == null || episodeData.audio_file == null || episodeData.audio_file.length == 0}
		<div>
			<p>Upload audio file</p>
			<input
				id="afUpload"
				type="file"
				accept=".mp3,.wav,.aac"
				bind:files={audioFileList}
				class="file-input file-input-bordered w-full max-w-xs"
			/>
		</div>
	{:else}
		<div class="w-full">
			<WaveForm
				fileUrl={`/api/files/${COLLECTION_EPISODE}/${episodeData.id}/${episodeData.audio_file}`}
			/>

			<div class="w-full flex mt-2">
				<button
					class="btn btn-outline btn-secondary ml-auto"
					on:click|preventDefault={handleReupload}>Reuplaod</button
				>
			</div>
		</div>
	{/if}
</div>
<div class="mt-6 flex items-center justify-end gap-x-6">
	{#if errMessage != null}
		<div class="mr-auto">
			<div
				class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<strong class="font-bold">{errMessage}</strong>
			</div>
		</div>
	{/if}
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
