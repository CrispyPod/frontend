<script lang="ts">
	import type { Episode } from '$lib/models/episode';

	import 'cherry-markdown/dist/cherry-markdown.css';
	import { onMount } from 'svelte';
	import Quill from 'quill';
	import 'quill/dist/quill.snow.css';
	import { COLLECTION_EPISODE, pb } from '$lib/pb-integrate/pb_client';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';

	let editor: HTMLElement;
	let quill: Quill;

	onMount(() => {
		quill = new Quill(editor, {
			debug: 'error',
			modules: {
				toolbar: true
			},
			placeholder: 'Compose an epic...',
			theme: 'snow'
		});
	});

	export let episodeData: Episode | null;
	export let handleNext: (e: Episode) => any;

	let errMessage: string | null = null;
	function onFormSubmit(e: SubmitEvent) {
		if (quill.root.innerHTML.length == 0) {
			errMessage = 'Please type in description of this episode.';
			return;
		}
		const form: HTMLFormElement | null = document.querySelector('#newEpisodeForm');
		const formData = new FormData(form!);
		const data = {
			title: formData.get('title'),
			description: quill.root.innerHTML,
			status: 'draft'
		};

		pb.collection(COLLECTION_EPISODE)
			.create(data)
			.then((v) => {
				episodeData = v as unknown as Episode;
				handleNext(episodeData);
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}
</script>

<form id="newEpisodeForm" on:submit|preventDefault={onFormSubmit}>
	<div class="form-control w-full">
		<label class="label" for="title">
			<span class="label-text">Episode title</span>
		</label>
		<input
			id="title"
			name="title"
			type="text"
			required
			placeholder="Type here"
			class="input input-bordered w-full"
		/>

		<label for="description" class="label-text mt-4">Description</label>
		<div class="mt-2 h-fit">
			<div class="w-full h-40 mb-10">
				<div bind:this={editor} />
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-end gap-x-6">
		{#if errMessage != null}
			<div class="alert alert-error">
				<strong class="font-bold">{errMessage}</strong>
			</div>
		{/if}
		<a href="/admin/episode" type="button" class="btn btn-active">Cancel</a>
		<button type="submit" class="btn btn-active btn-primary">Next</button>
	</div>
</form>
