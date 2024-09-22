<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { SiteConfig } from '$lib/models/siteConfig';
	import { adminSiteConfigS } from '$lib/stores/adminSiteConfigStore';
	import { get } from 'svelte/store';
	import { COLLECTION_SITE_CONFIG, backend_pb } from '$lib/pb-integrate/admin_pb';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';
	import { Button, Label, Input, Textarea, Hr } from 'flowbite-svelte';
	import type { Unsubscriber } from 'svelte/motion';

	let siteConfigSub: Unsubscriber | null = null;

	let siteConfig: SiteConfig;
	let errMessage: string | null = null;

	onMount(() => {
		siteConfig = get(adminSiteConfigS);
		siteConfigSub = adminSiteConfigS.subscribe((v) => {
			siteConfig = v;
		});
	});

	onDestroy(() => {
		if (siteConfigSub != null) {
			siteConfigSub();
		}
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

		backend_pb
			.collection(COLLECTION_SITE_CONFIG)
			.update(siteConfig.id, data)
			.then((v) => {
				adminSiteConfigS.set(v as unknown as SiteConfig);
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
		backend_pb
			.collection(COLLECTION_SITE_CONFIG)
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
		backend_pb
			.collection(COLLECTION_SITE_CONFIG)
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
	<div class="grid gap-6 mb-6 md:grid-cols-2">
		<div>
			<Label for="SiteName" class="mb-2">Podcast name</Label>
			<Input
				type="text"
				id="SiteName"
				name="SiteName"
				placeholder="Type here"
				required
				value={siteConfig == null ? '' : siteConfig.site_name}
			/>
		</div>
		<div>
			<Label for="SiteUrl" class="mb-2">Podcast Url</Label>
			<Input
				type="text"
				id="SiteUrl"
				name="SiteUrl"
				placeholder="Type here"
				required
				value={siteConfig == null ? '' : siteConfig.site_url}
			/>
		</div>
	</div>
	<div class="mb-6">
		<Label for="SiteDescription" class="mb-2">Podcast description</Label>
		<Textarea
			id="SiteDescription"
			name="SiteDescription"
			placeholder="Type here"
			rows="4"
			value={siteConfig == null ? '' : siteConfig.site_description}
		/>
	</div>
	<Hr classHr="my-8">Icon and Image</Hr>
	<Label class="space-y-2 mb-2">
		<span>Website icon</span>
		<!-- <Fileupload bind:files={websiteIconFileList} /> -->

		{#if siteConfig != undefined && siteConfig.site_icon != null && siteConfig.site_icon.length > 0}
			<img
				class="w-6 h-6"
				src={`/api/files/${COLLECTION_SITE_CONFIG}/${siteConfig.id}/${siteConfig.site_icon}`}
				alt="website icon"
			/>
		{/if}
		<input
			class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
			id="afUpload"
			type="file"
			accept=".ico"
			bind:files={websiteIconFileList}
		/>
	</Label>

	<Label class="space-y-2 mb-2">
		<span>Default thumbnail</span>
		{#if siteConfig != undefined && siteConfig.default_thumbnail != null && siteConfig.default_thumbnail.length > 0}
			<img
				class="w-80 h-80"
				src={`/api/files/${COLLECTION_SITE_CONFIG}/${siteConfig.id}/${siteConfig.default_thumbnail}`}
				alt="default episode thumbnail"
			/>
		{/if}
		<input
			class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
			id="afUpload"
			type="file"
			accept=".png,.jpeg,.jpg"
			bind:files={defaultThumbnailFileList}
		/>
	</Label>

	<Hr classHr="my-8">Analytics</Hr>

	<div class="mb-6">
		<Label for="headAnalytics" class="mb-2">Head analytics</Label>
		<Textarea id="headAnalytics" name="headAnalytics" placeholder="<scirpt>...</script>" rows="4" />
	</div>

	<div class="mb-6">
		<Label for="footerAnalytics" class="mb-2">Foot analytics</Label>
		<Textarea
			id="footerAnalytics"
			name="footerAnalytics"
			placeholder="<scirpt>...</script>"
			rows="4"
		/>
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
		<Button href="/admin" color="alternative" size="xl">Cancel</Button>
		<Button color="purple" type="submit" size="xl">Save</Button>
	</div>
</form>

<!-- <form id="siteConfigForm" on:submit|preventDefault={handleFormSubmit}>
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
		<Button href="/admin" color="alternative" size="xl">Cancel</Button>
		<Button color="purple" type="submit" size="xl">Save</Button>
	</div>
</form> -->
