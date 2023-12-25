<script lang="ts">
	import { graphqlRequest } from '$lib/graphqlRequest';
	import type { Episode } from '$lib/models/episode';
	import { token } from '$lib/stores/tokenStore';
	import { get } from 'svelte/store';

	import 'cherry-markdown/dist/cherry-markdown.css';
	import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
	import { onMount } from 'svelte';

	let cherryInstance: Cherry;
	onMount(() => {
		cherryInstance = new Cherry({
			id: 'markdown-container',
			value: '# type down description for your awesome podcast here!'
		});
	});

	export let episodeData: Episode | null;
	export let handleNext: (e: Episode) => any;

	let errMessage: string | null = null;
	async function onFormSubmit(e: SubmitEvent) {
		if (cherryInstance.getValue().length == 0) {
			errMessage = 'Please type in description of this episode.';
			return;
		}

		const form: HTMLFormElement | null = document.querySelector('#newEpisodeForm');
		const formData = new FormData(form!);

		const tokenS = get(token);
		const result = await graphqlRequest(
			tokenS,
			`mutation{createEpisode(input: {title:"` +
				encodeURIComponent(formData.get('title')!.toString()) +
				`",description:"` +
				encodeURIComponent(cherryInstance.getValue()) +
				`"}){id,title,description}}`
		);
		const resultJson = await result.json();

		if (resultJson.data != null) {
			episodeData = resultJson.data.createEpisode;
			handleNext(episodeData!);
		} else {
			errMessage = resultJson.errors[0].message;
		}
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
		<div class="mt-2">
			<div class="w-full">
				<!-- <svelte:component this={cherryInstance}/> -->
				<div id="markdown-container" class=" border-4 border-gray-500 min-h-96"></div>
				<!-- <Editor {value} {plugins} on:change={handleChange} /> -->
			</div>
			<!-- <textarea
				required
				id="description"
				name="description"
				rows="3"
				class="textarea textarea-bordered w-full"
			/> -->
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

