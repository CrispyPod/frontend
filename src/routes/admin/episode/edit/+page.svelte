<script lang="ts">
	import { onMount } from 'svelte';
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import { get } from 'svelte/store';
	import { type Episode } from '$lib/models/episode';
	import { goto } from '$app/navigation';
	import type { AudioFile } from '$lib/models/audioFile';
	import WaveForm from '$lib/components/WaveForm.svelte';
	import AdminUpload from '$lib/components/AdminUpload.svelte';
	import EpisodeListItem from '$lib/components/EpisodeListItem.svelte';
	import EpisodeDetailAudio from '$lib/components/EpisodeDetailAudio.svelte';
	import Quill from 'quill';
	import 'quill/dist/quill.snow.css';
	import { page } from '$app/stores';
	import { COLLECTION_EPISODE, pb } from '$lib/pb-integrate/pb_client';
	import { PUBLIC_PB_ENDPOINT } from '$env/static/public';

	let fetchedEpisode: Episode;
	let errMessage: string | null = null;

	$: if (fetchedEpisode) {
		if (fetchedEpisode == null) {
			fileUploadedAndNotSaved = true;
		}
	}

	let fileList: FileList;
	// Note that `fileList` is of type `FileList`, not an Array:
	// https://developer.mozilla.org/en-US/docs/Web/API/FileList
	let fileUploadedAndNotSaved = false;

	function fileListChanged() {
		startUpload();
	}

	$: fileList && fileListChanged();

	let editor: HTMLElement;
	let quill: Quill;

	onMount(() => {
		const params = $page.url.searchParams;
		if (!params.has('e')) {
			return;
		}

		quill = new Quill(editor, {
			debug: 'error',
			modules: {
				toolbar: true
			},
			placeholder: 'Compose an epic...',
			theme: 'snow'
		});

		const episodeId = params.get('e');
		console.log(episodeId);

		pb.collection(COLLECTION_EPISODE)
			.getFirstListItem(`id="${episodeId}"`)
			.then((v) => {
				console.log(v);
				fetchedEpisode = v as unknown as Episode;
				quill.root.innerHTML = fetchedEpisode.description;
			})
			.catch((e) => {
				//TODO: Handle not found
			});
	});

	async function handleSubmit(e: SubmitEvent, episodeData: Episode) {
		if (quill.root.innerHTML.length == 0) {
			errMessage = 'Please type in description of this episode.';
			return;
		}
		const form: HTMLFormElement | null = document.querySelector('#modifyEpisodeForm');
		const formData = new FormData(form!);

		// const toeknS = get(token);
		// let audioFileField = '';
		// if (episodeData.audioFileName != null && episodeData.audioFileName.length > 0) {
		// 	// console.log(episodeData);
		// 	audioFileField +=
		// 		',audioFileName:"' +
		// 		episodeData.audioFileName +
		// 		'",audioFileUploadName:"' +
		// 		episodeData.audioFileUploadName +
		// 		'"';
		// }
		// let thumbnailFileField = '';
		// if (episodeData.thumbnailFileName != null && episodeData.thumbnailFileName.length > 0) {
		// 	thumbnailFileField += ',thumbnailFileName:"' + episodeData.thumbnailFileName + '"';
		// }
		// let stat = parseInt(formData.get('status')!.toString());
		// let reqStr =
		// 	`mutation{  modifyEpisode(id:"` +
		// 	episodeData.id +
		// 	`",input: {title:"` +
		// 	encodeURIComponent(formData.get('title')!.toString()) +
		// 	`",description:"` +
		// 	encodeURIComponent(cherryInstance.getValue()) +
		// 	`",episodeStatus:` +
		// 	stat +
		// 	audioFileField +
		// 	thumbnailFileField +
		// 	`}){title,description,episodeStatus}}`;
		// console.log(reqStr);
		// const result = await graphqlRequest(toeknS, reqStr);
		// var resultJson = await result.json();
		// if (resultJson.data != null) {
		// 	goto('/admin/episode');
		// } else {
		// 	errMessage = resultJson.errors[0].message;
		// }
	}

	function handleDelete() {
		// if (fetchedEpisode.id.length == 0) {
		// 	return;
		// }
		// let a: any = document.getElementById('confirmDeleteModal');
		// a.showModal();
	}

	async function confirmDelete() {
		// 		if (fetchedEpisode.id.length == 0) {
		// 			return;
		// 		}
		// 		const tokenS = get(token);
		// 		let result = await graphqlRequest(
		// 			tokenS,
		// 			`mutation{
		//   deleteEpisode(id:"` +
		// 				fetchedEpisode.id +
		// 				`"){
		//     result
		//   }
		// }`
		// 		);
		// 		const resultJson = await result.json();
		// 		if (resultJson.data != null && resultJson.data.deleteEpisode.result) {
		// 			goto('/admin/episode');
		// 		} else {
		// 			try {
		// 				errMessage = resultJson.errors[0].message;
		// 			} catch (e) {
		// 				errMessage = 'failed to delete episode';
		// 			}
		// 		}
	}

	function handleForm(e: SubmitEvent) {
		handleSubmit(e, fetchedEpisode);
	}

	function handleReupload() {
		fetchedEpisode!.audio_file = null;
	}

	async function startUpload() {
		// let file = fileList.item(0);
		// const tokenS = get(token);
		// // console.log(tokenS);
		// let data = new FormData();
		// data.append('file', file!);
		// data.append('episodeId', fetchedEpisode.id);
		// let resp = await fetch('/api/audioFile', {
		// 	method: 'POST',
		// 	headers: [['Authorization', 'Bearer ' + tokenS]],
		// 	body: data
		// });
		// if (resp.status != 200) {
		// 	// TODO: show popup
		// }
		// let audioFile: AudioFile = await resp.json();
		// fetchedEpisode!.audioFileName = audioFile.audioFileName;
		// fetchedEpisode!.audioFileUploadName = file?.name!;
		// // fetchedEpisode!.audioFileDuration = audioFile.audioFileDuration;
		// fileUploadedAndNotSaved = true;
	}
</script>

<AdminLayout pageTitle="Edit episode">
	<span slot="actions">
		<button class="btn btn-error" on:click|preventDefault={handleDelete}>Delete</button>
	</span>
	<!-- <EpisodeForm {handleSubmit} episodeData={fetchedEpisode} {errMessage} /> -->
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
				<div class="w-full h-40 mb-10">
					<div bind:this={editor} />
				</div>
			</div>
		</div>

		<div class="divider" />

		<div>
			<p>Upload thumbnail</p>
			<AdminUpload
				accept=".png,.jpeg,.jpg"
				uploadFinish={(v) => {
					fetchedEpisode.thumbnail = v;
					console.log(fetchedEpisode);
				}}
			/>

			{#if fetchedEpisode != undefined && fetchedEpisode.thumbnail != null && fetchedEpisode.thumbnail.length > 0}
				<!-- {siteConfig.siteIconFile} -->
				<img
					class="w-64 h-64"
					src={`${PUBLIC_PB_ENDPOINT}/api/files/${COLLECTION_EPISODE}/${fetchedEpisode.id}/${fetchedEpisode.thumbnail}`}
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
						bind:files={fileList}
						class="file-input file-input-bordered w-full max-w-xs"
					/>
				</div>
			{:else}
				{#if fileUploadedAndNotSaved}
					Please hit save so that changes are committed.
				{/if}
				<WaveForm
					fileUrl={`${PUBLIC_PB_ENDPOINT}/api/files/${COLLECTION_EPISODE}/${fetchedEpisode.id}/${fetchedEpisode.audio_file}`}
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
				episode={{
					...fetchedEpisode,
					thumbnailFileName: `${PUBLIC_PB_ENDPOINT}/api/files/${COLLECTION_EPISODE}/${fetchedEpisode.id}/${fetchedEpisode.thumbnail}`
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
					value="0"
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
					value="1"
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
</AdminLayout>

{#if fetchedEpisode != null}
	<dialog id="confirmDeleteModal" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box">
			<h3 class="font-bold text-lg alert alert-error my-4">Delete confirm</h3>
			<p>Are you sure you want to delete podcast titled</p>
			<br />
			<h2 class="font-bold text-lg">{fetchedEpisode.title}</h2>
			<br />
			<p>Deletion can not be undone.</p>
			<div class="modal-action">
				<form method="dialog">
					<button class="btn btn-error" on:click={confirmDelete}>Confirm</button>
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}
