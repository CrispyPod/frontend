<script lang="ts">
	import { onMount } from 'svelte';
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { get } from 'svelte/store';
	import { PUBLIC_PB_ENDPOINT } from '$env/static/public';
	import { COLLECTION_SITE_CONFIG, pb } from '$lib/pb-integrate/pb_client';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';

	let siteConfig: SiteConfig;
	let errMessage: string | null = null;

	let headAnalytics = '';
	let footerAnalytics = '';

	onMount(() => {
		siteConfig = get(siteConfigS);
		siteConfigS.refresh().then(() => {
			siteConfig = get(siteConfigS);
		});
	});

	async function handleFormSubmit(e: SubmitEvent) {
		const form = document.querySelector('#siteConfigForm');
		const formData = new FormData(form as HTMLFormElement);

		const data = {
			site_name: formData.get('SiteName'),
			site_description: formData.get('SiteDescription'),
			site_url: formData.get('SiteUrl'),
			head_analytics: formData.get('headAnalytics'),
			foot_analytics: formData.get('headAnalytics')
		};

		pb.collection(COLLECTION_SITE_CONFIG)
			.update(siteConfig.id, data)
			.then((v) => {
				siteConfigS.set(v as unknown as SiteConfig);
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}

	let defaultThumbnailFileList: FileList;
	let websiteIconFileList: FileList;

	$: defaultThumbnailFileList && uploadDefaultThumbnail();
	$: websiteIconFileList && uploadSiteIcon();

	function uploadDefaultThumbnail() {
		const formData = new FormData();
		let file = defaultThumbnailFileList.item(0);
		formData.append('default_thumbnail', file!);
		pb.collection(COLLECTION_SITE_CONFIG)
			.update(siteConfig.id, formData)
			.then((v) => {
				siteConfig = v as unknown as SiteConfig;
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}

	function uploadSiteIcon() {
		const formData = new FormData();
		let file = websiteIconFileList.item(0);
		formData.append('site_icon', file!);
		pb.collection(COLLECTION_SITE_CONFIG)
			.update(siteConfig.id, formData)
			.then((v) => {
				siteConfig = v as unknown as SiteConfig;
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}
</script>

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
		<span class="label-text text-sm font-medium leading-6 text-gray-900">Podcast description</span>
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
		<img
			class="w-6 h-6"
			src={`${PUBLIC_PB_ENDPOINT}api/files/${COLLECTION_SITE_CONFIG}/${siteConfig.id}/${siteConfig.site_icon}`}
			alt="website icon"
		/>
	{/if}
	<input
		id="afUpload"
		type="file"
		accept=".ico"
		bind:files={websiteIconFileList}
		class="file-input file-input-bordered w-full max-w-xs"
	/>

	<label class="label" for="DeafultThumbnail">
		<span class="label-text text-sm font-medium leading-6 text-gray-900">Default thumbnail</span>
	</label>
	{#if siteConfig != undefined && siteConfig.default_thumbnail != null && siteConfig.default_thumbnail.length > 0}
		<!-- {siteConfig.defaultThumbnail} -->
		<img
			class="w-80 h-80"
			src={`${PUBLIC_PB_ENDPOINT}api/files/${COLLECTION_SITE_CONFIG}/${siteConfig.id}/${siteConfig.default_thumbnail}`}
			alt="default episode thumbnail"
		/>
	{/if}

	<input
		id="afUpload"
		type="file"
		accept=".png,.jpeg,.jpg"
		bind:files={defaultThumbnailFileList}
		class="file-input file-input-bordered w-full max-w-xs"
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
		placeholder="<scirpt>...</script>"
	></textarea>

	<label class="label" for="siteIcon">
		<span class="label-text text-sm font-medium leading-6 text-gray-900">Footer Analytics</span>
	</label>
	<textarea
		class="textarea textarea-bordered w-full"
		value={siteConfig == null ? null : decodeURI(footerAnalytics)}
		id="footerAnalytics"
		name="footerAnalytics"
		placeholder="<scirpt>...</script>"
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
