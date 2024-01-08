<script lang="ts">
	import { goto } from '$app/navigation';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { token } from '$lib/stores/tokenStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let errMessage: string | null = null;

	let siteConfig: SiteConfig;
	export let handleNext: () => any;

	onMount(async () => {
		await siteConfigS.init();
		siteConfig = get(siteConfigS);
	});

	async function handleFormSubmit(e: SubmitEvent) {
		const form = document.querySelector('#siteConfigForm');
		const formData = new FormData(form as HTMLFormElement);
		const tokenS = get(token);
		const result = await graphqlRequest(
			tokenS,
			`mutation{
  modifySiteConfig(input:{siteName:"` +
				formData.get('SiteName') +
				`",siteDescription:"` +
				formData.get('SiteDescription') +
				`",siteUrl:"` +
				formData.get('SiteUrl') +
				`"}){
    siteUrl
    siteName
    siteDescription
  }
}`
		);

		var resultJson = await result.json();
		if (resultJson.data != null) {
			siteConfigS.set(resultJson.data.modifySiteConfig);
			handleNext();
		} else {
			errMessage = resultJson.errors[0].message;
		}
	}
</script>

Next, change site settings.

<form id="siteConfigForm" on:submit|preventDefault={handleFormSubmit}>
	<div class="form-control w-full max-w-xs">
		<label class="label" for="SiteName">
			<span class="label-text text-sm font-medium leading-6 text-gray-900">Podcast name</span>
		</label>
		<input
			id="SiteName"
			name="SiteName"
			type="text"
			placeholder="Type here"
			value={siteConfig == null ? '' : siteConfig.siteName}
			class="input input-bordered w-full max-w-xs"
		/>

		<label class="label" for="SiteUrl">
			<span class="label-text text-sm font-medium leading-6 text-gray-900">Podcast Url</span>
		</label>
		<input
			id="SiteUrl"
			name="SiteUrl"
			type="url"
			placeholder="Type here"
			value={siteConfig == null ? '' : siteConfig.siteUrl}
			class="input input-bordered w-full max-w-xs"
		/>
	</div>

	<label class="label" for="SiteDescription">
		<span class="label-text text-sm font-medium leading-6 text-gray-900">Podcast description</span>
	</label>
	<textarea
		id="SiteDescription"
		name="SiteDescription"
		value={siteConfig == null ? '' : siteConfig.siteDescription}
		class="textarea textarea-bordered w-full"
		placeholder="Type here"
	/>

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
		<button type="submit" class="btn btn-primary">Next</button>
	</div>
</form>
