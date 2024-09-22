<script lang="ts">
	import { goto } from '$app/navigation';
	import ChangePassword from '$lib/components/admin-setup/ChangePassword.svelte';
	import ChangeSiteSetting from '$lib/components/admin-setup/ChangeSiteSetting.svelte';
	import Finish from '$lib/components/admin-setup/Finish.svelte';
	import Welcome from '$lib/components/admin-setup/Welcome.svelte';
	import type { SiteConfig } from '$lib/models/siteConfig';
	import { COLLECTION_SITE_CONFIG, COLLECTION_USER, pb } from '$lib/pb-integrate/pb_client';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import { onDestroy, onMount } from 'svelte';
	import { get, type Unsubscriber } from 'svelte/store';

	let curStepComponent = Welcome;

	function handleNext() {
		if (!pb.authStore.isValid) {
			goto('/admin/signin');
			return;
		}
		let data = {
			setup_step: ''
		};
		const siteConfig = get(siteConfigS);
		switch (siteConfig.setup_step) {
			default:
			case 'welcome':
				data.setup_step = 'changepassword';
				break;
			case 'changepassword':
				data.setup_step = 'changesitesetting';
				break;
			case 'changesitesetting':
				data.setup_step = 'finish';
				break;
			case 'finish':
				data.setup_step = 'done';
				break;
			case 'done':
				break;
		}

		pb.collection(COLLECTION_SITE_CONFIG)
			.update(siteConfig.id, data)
			.then((v) => {
				siteConfigS.set(v as unknown as SiteConfig);
			})
			.catch((e) => {
				console.log(e);
			});
	}
	let configSub: Unsubscriber;

	onMount(() => {
		if (pb.authStore.isValid) {
			pb.collection(COLLECTION_USER)
				.authRefresh()
				.then(() => {})
				.catch((e) => {
					pb.authStore.clear();
					goto('/admin/signin');
				});
		}
		configSub = siteConfigS.subscribe((v) => {
			if (v == null) return;
			switch (v.setup_step) {
				case 'welcome':
					curStepComponent = Welcome;
					break;
				case 'changepassword':
					curStepComponent = ChangePassword;
					break;
				case 'changesitesetting':
					curStepComponent = ChangeSiteSetting;
					break;
				case 'finish':
					curStepComponent = Finish;
					break;
				case 'done':
					goto('/admin');
			}
		});
		siteConfigS.init();
	});

	onDestroy(() => {
		configSub();
	});
</script>

<div class="h-full">
	<svelte:component this={curStepComponent} {handleNext} />
</div>
