<script lang="ts">
	import { onMount } from 'svelte';
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { get } from 'svelte/store';
	// import { graphqlRequest } from '$lib/graphqlRequest';
	// import { token } from '$lib/stores/tokenStore';
	import { goto } from '$app/navigation';
	import AdminUpload from '$lib/components/AdminUpload.svelte';

	let siteConfig: SiteConfig;
	let errMessage: string | null = null;

	let headAnalytics = '';
	let footerAnalytics = '';

	onMount(() => {
		// await siteConfigS.refresh();
		// siteConfig = get(siteConfigS);
		// headAnalytics = siteConfig.headAnalytics!;
		// footerAnalytics = siteConfig.footerAnalytics!;
	});

	async function handleFormSubmit(e: SubmitEvent) {
		// 		const form = document.querySelector('#siteConfigForm');
		// 		const formData = new FormData(form as HTMLFormElement);
		// 		console.log(formData.get('headAnalytics'));
		// 		console.log(formData.get('footerAnalytics'));
		// 		let headAnalyticInput: string = '';
		// 		if (
		// 			formData.get('headAnalytics') != null &&
		// 			formData.get('headAnalytics')!.toString().length > 0
		// 		) {
		// 			headAnalyticInput += `,headAnalytics:"${encodeURI(formData.get('headAnalytics')!.toString())}"`;
		// 		}
		// 		let footerAnalyticInput: string = '';
		// 		if (
		// 			formData.get('footerAnalytics') != null &&
		// 			formData.get('footerAnalytics')!.toString().length > 0
		// 		) {
		// 			footerAnalyticInput += `,footerAnalytics:"${encodeURI(formData.get('footerAnalytics')!.toString())}"`;
		// 		}
		// 		const tokenS = get(token);
		// 		const result = await graphqlRequest(
		// 			tokenS,
		// 			`mutation{
		//   modifySiteConfig(input:{siteName:"` +
		// 				formData.get('SiteName') +
		// 				`",siteDescription:"` +
		// 				formData.get('SiteDescription') +
		// 				`",siteUrl:"` +
		// 				formData.get('SiteUrl') +
		// 				`",siteIconFile:"${siteConfig.siteIconFile}",defaultThumbnail:"${siteConfig.defaultThumbnail}"${headAnalyticInput}${footerAnalyticInput}}){
		//     siteUrl
		//     siteName
		//     siteDescription
		// 	siteIconFile
		// 	defaultThumbnail
		// 	headAnalytics
		// 	footerAnalytics
		//   }
		// }`
		// 		);
		// 		var resultJson = await result.json();
		// 		if (resultJson.data != null) {
		// 			siteConfigS.set(resultJson.data.modifySiteConfig);
		// 			goto('/admin');
		// 		} else {
		// 			errMessage = resultJson.errors[0].message;
		// 		}
	}
</script>

<AdminLayout pageTitle="Site setting">
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
				value={siteConfig == null ? '' : siteConfig.site_name}
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
				value={siteConfig == null ? '' : siteConfig.site_url}
				class="input input-bordered w-full max-w-xs"
			/>
		</div>

		<label class="label" for="SiteDescription">
			<span class="label-text text-sm font-medium leading-6 text-gray-900">Podcast description</span
			>
		</label>
		<textarea
			id="SiteDescription"
			name="SiteDescription"
			value={siteConfig == null ? '' : siteConfig.site_description}
			class="textarea textarea-bordered w-full"
			placeholder="Type here"
		/>

		<div class="divider">Icons an Images</div>
		<label class="label" for="siteIcon">
			<span class="label-text text-sm font-medium leading-6 text-gray-900"> Website icon</span>
		</label>
		{#if siteConfig != undefined && siteConfig.site_icon != null && siteConfig.site_icon.length > 0}
			<!-- {siteConfig.siteIconFile} -->
			<img class="w-6 h-6" src={`/api/imageFile/` + siteConfig.site_icon} alt="website icon" />
		{/if}
		<AdminUpload
			accept=".png,.jpeg,.jpg,.ico"
			uploadFinish={(v) => {
				siteConfig.site_icon = v;
				// console.log(v);
			}}
		/>

		<label class="label" for="DeafultThumbnail">
			<span class="label-text text-sm font-medium leading-6 text-gray-900">Default thumbnail</span>
		</label>
		{#if siteConfig != undefined && siteConfig.default_thumbnail != null && siteConfig.default_thumbnail.length > 0}
			<!-- {siteConfig.defaultThumbnail} -->
			<img
				class="w-80 h-80"
				src={`/api/imageFile/` + siteConfig.default_thumbnail}
				alt="default episode thumbnail"
			/>
		{/if}
		<AdminUpload
			uploadFinish={(v) => {
				siteConfig.default_thumbnail = v;
			}}
		/>

		<div class="divider">Analytics</div>

		<label class="label" for="siteIcon">
			<span class="label-text text-sm font-medium leading-6 text-gray-900">Head Analytics</span>
		</label>
		<textarea
			class="textarea textarea-bordered w-full"
			value={siteConfig == null ? null : decodeURI(headAnalytics)}
			id="headAnalytics"
			name="headAnalytics"
			placeholder="<scirpt ...></script>"
		></textarea>

		<label class="label" for="siteIcon">
			<span class="label-text text-sm font-medium leading-6 text-gray-900">Footer Analytics</span>
		</label>
		<textarea
			class="textarea textarea-bordered w-full"
			value={siteConfig == null ? null : decodeURI(footerAnalytics)}
			id="footerAnalytics"
			name="footerAnalytics"
			placeholder="<scirpt ...></script>"
		></textarea>

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
			<a href="/admin" type="button" class="btn">Cancel</a>
			<button type="submit" class="btn btn-primary">Save</button>
		</div>
	</form>
</AdminLayout>
