<script lang="ts">
	import type { AudioFile } from '$lib/models/audioFile';
	import type { Episode } from '$lib/models/episode';
	// import { token } from '$lib/stores/tokenStore';
	import { get } from 'svelte/store';
	import WaveForm from '$lib/components/WaveForm.svelte';
	// import { graphqlRequest } from '$lib/graphqlRequest';

	export let episodeData: Episode | null;
	export let handleNext: (e: Episode) => any;
	export let siteUrl: string = '';

	let canClickNext: boolean = false;
	let errMessage: string | null = null;
	let uploading: boolean = false;

	let fileList: FileList;
	// Note that `fileList` is of type `FileList`, not an Array:
	// https://developer.mozilla.org/en-US/docs/Web/API/FileList

	$: fileList && startUpload();

	function checkCanClickNext() {
		canClickNext = episodeData?.audio_file != null && episodeData?.audio_file?.length > 0;
	}

	$: episodeData && checkCanClickNext();

	async function startUpload() {
		// uploading = true;
		// let file = fileList.item(0);
		// const tokenS = get(token);
		// // console.log(tokenS);

		// let data = new FormData();
		// data.append('file', file!);
		// data.append('episodeId', episodeData!.id);
		// let resp = await fetch('/api/audioFile', {
		// 	method: 'POST',
		// 	headers: [['Authorization', 'Bearer ' + tokenS]],
		// 	body: data
		// });

		// if (resp.status != 200) {
		// 	// TODO: show popup
		// }

		// let audioFile: AudioFile = await resp.json();

		// episodeData!.audioFileName = audioFile.audioFileName;
		// episodeData!.audioFileUploadName = file?.name!;
		// uploading = false;
	}

	async function onNext() {
		// const tokenS = get(token);
		// const result = await graphqlRequest(
		// 	tokenS,
		// 	`mutation{modifyEpisode(id:"` +
		// 		episodeData?.id +
		// 		`",input:{audioFileName:"` +
		// 		episodeData?.audioFileName +
		// 		`",audioFileUploadName:"` +
		// 		episodeData?.audioFileUploadName +
		// 		`"}){title}}`
		// );
		// const resultJson = await result.json();
		// if (resultJson.data != null) {
		// 	handleNext(episodeData!);
		// } else {
		// 	errMessage = resultJson.errors[0].message;
		// }
	}

	function handleReupload() {
		episodeData!.audioFileName = null;
		episodeData!.audioFileUploadName = null;
	}
</script>

<div class="flex flex-col justify-center items-center">
	{#if episodeData == null || episodeData.audioFileName == null || episodeData.audioFileName.length == 0}
		<div>
			<p>Upload audio file</p>
			<input
				id="afUpload"
				type="file"
				accept=".mp3,.wav,.aac"
				bind:files={fileList}
				class="file-input file-input-bordered w-full max-w-xs"
			/>
		</div>
	{:else}
		<div class="w-full">
			<WaveForm fileUrl="{siteUrl}/api/audioFile/{episodeData.audioFileName}" />

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
