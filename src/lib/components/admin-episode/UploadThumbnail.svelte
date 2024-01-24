<script lang="ts">
	import type { Episode } from '$lib/models/episode';
	import { token } from '$lib/stores/tokenStore';
	import { get } from 'svelte/store';
	import WaveForm from '$lib/components/WaveForm.svelte';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { onMount } from 'svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';

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
		canClickNext = episodeData?.audioFileName != null && episodeData?.audioFileName?.length > 0;
	}

	$: episodeData && checkCanClickNext();

	let siteConfig: SiteConfig;

	onMount(async () => {
		await siteConfigS.init();
		siteConfig = get(siteConfigS);
	});

	async function startUpload() {
		uploading = true;
		let file = fileList.item(0);
		const tokenS = get(token);
		// console.log(tokenS);

		let data = new FormData();
		data.append('file', file!);
		data.append('episodeId', episodeData!.id);
		let resp = await fetch('/api/imageFile', {
			method: 'POST',
			headers: [['Authorization', 'Bearer ' + tokenS]],
			body: data
		});

		if (resp.status != 200) {
			// TODO: show popup
		}

		let audioFile = await resp.json();

		episodeData!.thumbnailFileName = audioFile.thumbnailFileName;
		episodeData!.thumbnailUploadName = file?.name!;
		uploading = false;
	}

	async function onNext() {
		const tokenS = get(token);
		const result = await graphqlRequest(
			tokenS,
			`mutation{modifyEpisode(id:"` +
				episodeData?.id +
				`",input:{thumbnailFileName:"` +
				episodeData?.thumbnailFileName +
				`",thumbnailFileUploadName:"` +
				episodeData?.thumbnailUploadName +
				`"}){title}}`
		);
		const resultJson = await result.json();
		if (resultJson.data != null) {
			handleNext(episodeData!);
		} else {
			errMessage = resultJson.errors[0].message;
		}
	}

	function handleReupload() {
		episodeData!.thumbnailFileName = null;
		episodeData!.thumbnailUploadName = null;
	}
</script>

<div class="flex flex-col justify-center items-center">
	{#if episodeData == null || episodeData.thumbnailFileName == null || episodeData.thumbnailFileName.length == 0}
		<div>
			<p>Upload audio file</p>
			<input
				id="afUpload"
				type="file"
				accept=".png,.jpeg,.jpg"
				bind:files={fileList}
				class="file-input file-input-bordered w-full max-w-xs"
			/>
		</div>
	{:else}
		<div class="w-full">
			<p class="text-center">This is what will display in episode page.</p>
			<div class="card lg:card-side bg-base-100 shadow-xl m-10">
				<img
					class="w-80 h-80"
					src={episodeData.thumbnailFileName
						? siteUrl + '/api/imageFile/' + episodeData.thumbnailFileName
						: siteConfig != null &&
							  siteConfig.defaultThumbnail != null &&
							  siteConfig.defaultThumbnail.length > 0
							? `/api/imageFile/${siteConfig.defaultThumbnail}`
							: '/EpisodeDefaultThumbnailSquare.png'}
					alt={episodeData.title}
				/>

				<div class="card-body">
					<WaveForm fileUrl="{siteUrl}/api/audioFile/{episodeData.audioFileName}" />
				</div>
			</div>

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
