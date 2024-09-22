<script lang="ts">
	import { onMount } from 'svelte';
	import { type Episode } from '$lib/models/episode';
	import WaveForm from '$lib/components/WaveForm.svelte';
	import EpisodeListItem from '$lib/components/EpisodeListItem.svelte';
	import EpisodeDetailAudio from '$lib/components/EpisodeDetailAudio.svelte';
	import { page } from '$app/stores';
	import { COLLECTION_EPISODE, pb } from '$lib/pb-integrate/pb_client';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';
	import { goto } from '$app/navigation';
	import 'cherry-markdown/dist/cherry-markdown.css';
	import Cherry from 'cherry-markdown/dist/cherry-markdown.core';

	let fetchedEpisode: any;
	let errMessage: string | null = null;

	let audioFileList: FileList;
	let thumbnailFileList: FileList;
	// Note that `fileList` is of type `FileList`, not an Array:
	// https://developer.mozilla.org/en-US/docs/Web/API/FileList

	$: audioFileList && uploadAudioFile();
	$: thumbnailFileList && uploadThumbnail();

	let cherryInstance: Cherry;

	onMount(() => {
		const params = $page.url.searchParams;
		if (!params.has('e')) {
			goto('/admin/episode');
			return;
		}

		cherryInstance = new Cherry({
			id: 'markdown-container',
			value: '# welcome to cherry editor!'
		});

		const episodeId = params.get('e');

		pb.collection(COLLECTION_EPISODE)
			.getFirstListItem(`id="${episodeId}"`)
			.then((v) => {
				fetchedEpisode = v;
				cherryInstance.setValue(v.description_plain);
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	});

	async function handleSubmit(e: SubmitEvent, episodeData: Episode) {
		if (cherryInstance.getHtml().length == 0) {
			errMessage = 'Please type in description of this episode.';
			return;
		}

		const form: HTMLFormElement | null = document.querySelector('#modifyEpisodeForm');
		const formData = new FormData(form!);
		const data = {
			title: formData.get('title')!.toString(),
			description: cherryInstance.getHtml(),
			description_plain: cherryInstance.getValue(),
			status: formData.get('status')!.toString()
		};

		pb.collection(COLLECTION_EPISODE)
			.update(episodeData.id, data)
			.then((v) => {
				goto('/admin/episode');
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}

	function handleForm(e: SubmitEvent) {
		handleSubmit(e, fetchedEpisode);
	}

	function handleReupload() {
		fetchedEpisode!.audio_file = null;
	}

	async function uploadAudioFile() {
		const formData = new FormData();
		let file = audioFileList.item(0);
		formData.append('audio_file', file!);
		pb.collection(COLLECTION_EPISODE)
			.update(fetchedEpisode.id, formData)
			.then((v) => {
				fetchedEpisode = v as unknown as Episode;
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}

	async function uploadThumbnail() {
		const formData = new FormData();
		let file = thumbnailFileList.item(0);
		formData.append('thumbnail', file!);
		pb.collection(COLLECTION_EPISODE)
			.update(fetchedEpisode.id, formData)
			.then((v) => {
				fetchedEpisode = v as unknown as Episode;
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}
</script>

<!-- <svelte:fragment slot="actions"> -->
<!-- <button class="btn btn-error" on:click|preventDefault={handleDelete}>Delete</button> -->
<!-- </svelte:fragment> -->
<form id="modifyEpisodeForm" on:submit|preventDefault={handleForm}>
	<div class="form-control">
		<label class="label" for="title">
			<span class="label-text">Title</span>
		</label>
		<input
			required
			id="title"
			name="title"
			type="text"
			value={fetchedEpisode == null ? '' : fetchedEpisode.title}
			class="input input-bordered w-full max-w-xs"
		/>
	</div>

	<div class="form-control w-full">
		<label class="label" for="description">
			<span class="label-text">Description</span>
		</label>

		<div class="mt-2 h-fit">
			<div id="markdown-container"></div>
		</div>
	</div>

	<div class="divider" />

	<div>
		<p>Upload thumbnail</p>
		<input
			type="file"
			accept=".png,.jpeg,.jpg"
			class="file-input file-input-bordered w-full max-w-xs"
			bind:files={thumbnailFileList}
		/>

		{#if fetchedEpisode != undefined && fetchedEpisode.thumbnail != null && fetchedEpisode.thumbnail.length > 0}
			<!-- {siteConfig.siteIconFile} -->
			<img
				class="w-64 h-64"
				src={`/api/files/${COLLECTION_EPISODE}/${fetchedEpisode.id}/${fetchedEpisode.thumbnail}`}
				alt="website icon"
			/>
		{/if}
	</div>

	<div class="form-control mt-5">
		{#if fetchedEpisode == null || fetchedEpisode.audio_file == null || fetchedEpisode.audio_file.length == 0}
			<div>
				<p>Upload audio file</p>
				<input
					id="afUpload"
					type="file"
					bind:files={audioFileList}
					class="file-input file-input-bordered w-full max-w-xs"
				/>
			</div>
		{:else}
			<WaveForm
				fileUrl={`/api/files/${COLLECTION_EPISODE}/${fetchedEpisode.id}/${fetchedEpisode.audio_file}`}
			/>

			<div class="w-full flex mt-2">
				<button
					class="btn btn-outline btn-secondary ml-auto"
					on:click|preventDefault={handleReupload}>Reuplaod</button
				>
			</div>
		{/if}
	</div>

	{#if fetchedEpisode != undefined && fetchedEpisode.thumbnail != null && fetchedEpisode.thumbnail.length > 0 && fetchedEpisode.audio_file != null && fetchedEpisode.audio_file.length != 0}
		<div class="divider">front end element</div>
		<EpisodeListItem
			linked={false}
			episode={{
				...fetchedEpisode,
				thumbnailFileName: `/api/files/${COLLECTION_EPISODE}/${fetchedEpisode.id}/${fetchedEpisode.thumbnail}`
			}}
		/>
		<EpisodeDetailAudio episodeData={fetchedEpisode} />
	{/if}

	<div class="divider" />

	<div class="form-control max-w-xs">
		<label class="label cursor-pointer">
			<span class="label-text">Draft</span>
			<input
				required
				id="status-draft"
				name="status"
				type="radio"
				value="draft"
				checked={fetchedEpisode != null && fetchedEpisode.status == 'draft'}
				class="radio checked:bg-neutral"
			/>
		</label>
		<label class="label cursor-pointer">
			<span class="label-text">Published</span>
			<input
				required
				id="status-draft"
				name="status"
				type="radio"
				value="published"
				checked={fetchedEpisode != null && fetchedEpisode.status == 'published'}
				class="radio checked:bg-accent"
			/>
		</label>
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
		<button type="submit" class="btn btn-active btn-primary">Save</button>
	</div>
</form>
